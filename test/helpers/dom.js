import jsdom from 'jsdom-global'

export const installWindowResizeEvent = () => {
  // Simulate window resize event
  const resizeEvent = document.createEvent('Event')
  resizeEvent.initEvent('resize', true, true)

  window.resizeTo = (width, height) => {
    window.innerWidth = width || window.innerWidth
    window.innerHeight = height || window.innerHeight
    window.dispatchEvent(resizeEvent)
  }

  window.triggerResize = () => {
    window.resizeTo(1000, 1000)
  }

  window.triggerResizeSeries = () => {
    ;[0, 50, 100].forEach((timeout) => {
      setTimeout(() => window.triggerResize(), timeout)
    })
  }
}

export const createDocument = () => {
  const doc = jsdom()
  installWindowResizeEvent()
  return doc
}

export default createDocument
