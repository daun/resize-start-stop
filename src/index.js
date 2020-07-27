import debounce from 'lodash/debounce'

/*
 * General wait time for throttling & debouncing (ms)
 *
 */
const defaultWait = 200

/*
 * Store handlers for later removal
 *
 */
const handlers = []

/*
 * Bind `resizestart` and `resizestop` events
 *
 */
export default function bindResizeEvents({ wait = defaultWait } = {}) {
  // prettier-ignore
  const startHandler = debounce(() => {
    window.dispatchEvent(new Event('resizestart'))
  }, wait, { leading: true, trailing: false })

  // prettier-ignore
  const stopHandler = debounce(() => {
    window.dispatchEvent(new Event('resizestop'))
  }, wait)

  window.addEventListener('resize', startHandler, false)
  window.addEventListener('resize', stopHandler, false)

  handlers.push(startHandler, stopHandler)
}

/*
 * Unbind `resizestart` and `resizestop` events
 *
 */
export function unbindResizeEvents() {
  handlers.forEach((handler) =>
    window.removeEventListener('resize', handler, false)
  )
}

/*
 * Add class to HTML element while resizing window
 *
 */
export function toggleClassDuringResize({
  className = 'is-resizing',
  element = document.documentElement,
  wait = defaultWait
} = {}) {
  if (!handlers.length) {
    bindResizeEvents({ wait })
  }

  // prettier-ignore
  window.addEventListener('resizestart', () => {
    element.classList.add(className)
  }, false)

  // prettier-ignore
  window.addEventListener('resizestop', () => {
    element.classList.remove(className)
  }, false)
}
