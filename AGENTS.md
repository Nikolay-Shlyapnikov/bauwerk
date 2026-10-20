# bauwerk

Одностраничный сайт-визитка строительной компании «Бауверк». Тот же заказчик, что и у соседнего проекта `fragma`, стек и правила кода повторяют `fragma/front` (без Nx).

## Стек

- Next.js 16 (App Router), dev-сборка через Turbopack
- React 19, TypeScript 6
- LESS + CSS Modules, как во fragma (правила Turbopack для `*.less` — в `next.config.ts`), `clsx` для склейки классов
- ESLint (flat config) и Prettier — правила из `fragma/front`
- pnpm, Node 24

## Команды

- `pnpm dev` — dev-сервер на http://localhost:3000
- `pnpm build` — статический экспорт в `out/` (`output: 'export'` в `next.config.ts`)
- `pnpm lint`, `pnpm typecheck`, `pnpm format`

## Структура

- `app/layout.tsx` — `<html>`, шрифт Manrope (`next/font`), метаданные и OG-теги
- `app/page.tsx` — собирает страницу из секций
- `app/robots.ts`, `app/sitemap.ts` — генерируются в статику при сборке
- `src/config.ts` — домен сайта и контактный email
- `app/globals.less` — сброс стилей и базовая типографика
- `src/styles/vars.module.less` — палитра, радиусы, тени, брейкпоинты (`@media (min-width: @md) { … }`)
- `src/styles/mixins.module.less` — контейнер, отступы секций, типовые заголовки
- `src/components/layout/` — шапка и подвал
- `src/components/sections/` — секции страницы, данные секции лежат в её файле
- `src/components/ui/` — мелкие общие компоненты
- Каждый компонент — папка `Name/Name.tsx` + `Name.module.less`
- `public/` — статика, отдаётся как есть

## Правила

- Сайт полностью статический: никаких Route Handlers с динамикой, server actions, `cookies()`/`headers()` — они ломают `output: 'export'`.
- Картинки — через `next/image` (оптимизация отключена, `images.unoptimized`).
- Компоненты — стрелочные функции с именованным экспортом; `default` — только у файлов `app/`.
- Ключи объектов сортируются по алфавиту (`perfectionist/sort-objects`), `curly` обязателен.
- Импорт из `src` — через алиас `@/`; в `.less` — относительные пути к `src/styles`.
- Стили mobile-first: базовые правила для телефона, расширения — через `@media (min-width: @sm / @md / @lg)`.
- Вложенные классы — через `&Suffix` (`.card { &Title {} }` → `styles.cardTitle`), как во fragma.
- Цвета и радиусы — только из `vars.module.less`, без «магических» значений в компонентах.
