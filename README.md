# Бауверк

Одностраничный сайт строительной компании «Бауверк»: Next.js 16 со статическим экспортом, LESS-модули. Правила кода и структура — в [AGENTS.md](AGENTS.md).

## Разработка

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Перед пушем то же, что проверяет CI:

```bash
pnpm lint && pnpm format:check && pnpm typecheck && pnpm build
```

## Как устроен деплой

```text
push в main ──► GitHub Actions
                 ├─ check:          lint, prettier, typecheck, build
                 ├─ build-and-push: Docker-образ → ghcr.io/<владелец>/<репозиторий>:sha-<коммит>
                 └─ deploy:         по SSH на сервер → docker compose pull && up -d
```

- Образ — [Caddy](https://caddyserver.com) с готовой статикой внутри ([Dockerfile](Dockerfile), [Caddyfile](Caddyfile)). Node на сервере не нужен.
- Caddy сам выпускает и продлевает HTTPS-сертификат Let's Encrypt, когда задан домен.
- На PR запускаются только проверки, без деплоя.
- Каждый коммит выкатывается своим образом `:sha-xxxxxxx`. **Откат** — открыть в Actions запуск нужного коммита и нажать _Re-run all jobs_.
- Образы хранятся в GitHub Container Registry, отдельный аккаунт в Docker Hub не нужен.

## Первичная настройка (один раз)

### 1. Сервер

Любой VPS с Ubuntu/Debian, 1 ГБ RAM хватает с запасом — сборка идёт в GitHub, сервер только раздаёт статику.

```bash
# Docker
curl -fsSL https://get.docker.com | sh

# отдельный пользователь для деплоя вместо root
adduser --disabled-password --gecos "" deploy
usermod -aG docker deploy

# папка, куда CI кладёт docker-compose.yml и .env
mkdir -p /opt/bauwerk && chown deploy:deploy /opt/bauwerk
```

Порты 80 и 443 (TCP и UDP) должны быть открыты в файрволе сервера и в панели хостинга.

### 2. SSH-ключ для CI

На своём компьютере:

```bash
ssh-keygen -t ed25519 -f bauwerk_deploy -N "" -C "bauwerk-ci"
```

Содержимое `bauwerk_deploy.pub` — на сервер, в `/home/deploy/.ssh/authorized_keys` (права: папка `700`, файл `600`, владелец `deploy`). Приватный `bauwerk_deploy` — в секреты GitHub (следующий шаг), после этого локальную копию можно удалить.

### 3. GitHub

**Settings → Secrets and variables → Actions:**

| Тип      | Имя              | Значение                                                                                         |
| -------- | ---------------- | ------------------------------------------------------------------------------------------------ |
| Secret   | `SERVER_HOST`    | IP сервера                                                                                       |
| Secret   | `SERVER_USER`    | `deploy`                                                                                         |
| Secret   | `SERVER_SSH_KEY` | содержимое приватного ключа `bauwerk_deploy` целиком                                             |
| Variable | `SITE_ADDRESS`   | пока нет DNS — не задавать (сайт будет на `http://IP`); потом — `bauwerk.tech, www.bauwerk.tech` |

**Settings → Environments** — создать окружение `production`. В нём можно включить _Required reviewers_, если выкатку нужно подтверждать вручную.

После этого любой push в `main` выкатывает сайт.

### 4. Домен

У регистратора `bauwerk.tech` — две A-записи на IP сервера:

| Тип | Имя   | Значение   |
| --- | ----- | ---------- |
| A   | `@`   | IP сервера |
| A   | `www` | IP сервера |

Когда записи начнут резолвиться (`nslookup bauwerk.tech` возвращает IP сервера — обычно от нескольких минут до пары часов), задать переменную `SITE_ADDRESS` = `bauwerk.tech, www.bauwerk.tech` и перезапустить деплой: **Actions → bauwerk ci/cd → Run workflow**. Caddy получит сертификат при первом запросе.

## Полезное на сервере

```bash
cd /opt/bauwerk
docker compose ps               # запущен ли контейнер
docker compose logs -f bauwerk  # логи Caddy, в том числе выпуск сертификата
cat .env                        # какой образ и адрес сейчас выкачены
```

## Локальная проверка образа

```bash
docker build -t bauwerk .
docker run --rm -p 8090:80 bauwerk   # http://localhost:8090
```

## Временная копия на GitHub Pages

Пока нет доступа к серверу, сайт публикуется на `https://<владелец>.github.io/<репозиторий>/` ([pages.yml](.github/workflows/pages.yml)) — на каждый push в `main`, параллельно с основным деплоем.

- Включить один раз: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
- Сборка идёт с `BASE_PATH=/<репозиторий>` (сайт лежит в подпапке) и `PREVIEW=true` (тег `noindex`, чтобы копия не попала в поиск рядом с основным доменом).
- Когда сайт заработает на своём домене — удалить `pages.yml` и выключить Pages в настройках.
