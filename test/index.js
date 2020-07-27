import { assert } from 'chai'

import jsdom from 'jsdom-global'

jsdom()

// Simulate window resize event
const resizeEvent = document.createEvent('Event')
resizeEvent.initEvent('resize', true, true)

window.resizeTo = (width, height) => {
  window.innerWidth = width || global.window.innerWidth
  window.innerHeight = height || global.window.innerHeight
  window.dispatchEvent(resizeEvent)
}

import bindResizeEvents, { toggleClassDuringResize } from '../src'
bindResizeEvents()

describe('Library', function () {
  it('exports a function', () => {
    assert(typeof bindResizeEvents === 'function', 'instance not a function')
  })
})

describe('Events', function () {
  this.timeout(1000)

  it('triggers a resizestart event on resize', (done) => {
    let triggered = false
    window.addEventListener('resizestart', () => {
      !triggered && done()
      triggered = true
    })
    window.resizeTo(800, 1000)
  })
  it('triggers a resizestop after resize', (done) => {
    let triggered = false
    window.addEventListener('resizestop', () => {
      !triggered && done()
      triggered = true
    })
    window.resizeTo(600, 1000)
  })
})

describe('Class names', function () {
  this.timeout(1000)

  const className = 'resize-classname-test'
  toggleClassDuringResize({ className })

  it('adds a classname on resize', () => {
    window.resizeTo(800, 1000)
    assert(
      document.documentElement.classList.contains(className),
      'class name was not added'
    )
  })
  it('removes the classname after resize', (done) => {
    window.resizeTo(600, 1000)
    setTimeout(() => {
      if (!document.documentElement.classList.contains(className)) {
        done()
      }
    }, 500)
  })
})
