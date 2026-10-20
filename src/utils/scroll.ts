// сколько вообще можно прокрутить страницу
export const getMaxScrollY = () =>
	Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

// scrollY, зажатый в реальные границы страницы. В Safari (особенно на iOS) при «резиновом»
// отскоке на краях scrollY уходит в минус у верха и за максимум у низа, а потом сам возвращается —
// без зажима возврат после отскока внизу выглядит как скролл вверх
export const getClampedScrollY = () => Math.min(Math.max(window.scrollY, 0), getMaxScrollY())
