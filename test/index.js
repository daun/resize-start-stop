import { assert } from 'chai'

import createDocument from './helpers/dom'

import bindResizeEvents, {
  unbindResizeEvents,
  toggleClassDuringResize
} from '../src'

const timeout = 1000

describe('resize-start-stop', function () {
  it('exports a function', () => {
    assert(typeof bindResizeEvents === 'function')
  })
})

describe('bindResizeEvents', function () {
  this.timeout(timeout)

  beforeEach(function () {
    this.doc = createDocument()
    bindResizeEvents()
  })
  afterEach(function () {
    unbindResizeEvents()
    this.doc()
  })

  it('adds a resizestart event', () => {
    window.addEventListener('resizestart', () => assert(true))
    window.triggerResize()
  })

  it('adds a resizestop event', () => {
    window.addEventListener('resizestop', () => assert(true))
    window.triggerResize()
  })
})

describe('unbindResizeEvents', function () {
  this.timeout(timeout)

  beforeEach(function () {
    this.doc = createDocument()
    bindResizeEvents()
    unbindResizeEvents()
  })
  afterEach(function () {
    this.doc()
  })

  it('unbinds the resizestart event', () => {
    let triggered = false
    window.addEventListener('resizestart', () => (triggered = true))
    window.triggerResize()
    setTimeout(() => assert(triggered === false), 500)
  })

  it('unbinds the resizestop event', () => {
    let triggered = false
    window.addEventListener('resizestop', () => (triggered = true))
    window.triggerResize()
    setTimeout(() => assert(triggered === false), 500)
  })
})

describe('toggleClassDuringResize', function () {
  this.timeout(timeout)

  const defaultClassName = 'is-resizing'

  beforeEach(function () {
    this.doc = createDocument()
    toggleClassDuringResize()
  })
  afterEach(function () {
    unbindResizeEvents()
    this.doc()
  })

  it('adds a classname on resize', () => {
    window.triggerResize()
    assert(document.documentElement.classList.contains(defaultClassName))
  })
  it('removes the classname after resize', (done) => {
    window.triggerResize()
    setTimeout(() => {
      assert(!document.documentElement.classList.contains(defaultClassName))
      done()
    }, 500)
  })
})

describe('toggleClassDuringResize with options', function () {
  this.timeout(timeout)

  const customClassName = 'resize-classname-test'

  beforeEach(function () {
    this.doc = createDocument()
    toggleClassDuringResize({ className: customClassName })
  })
  afterEach(function () {
    unbindResizeEvents()
    this.doc()
  })

  it('takes a custom class name', () => {
    window.triggerResize()
    assert(document.documentElement.classList.contains(customClassName))
  })
  it('removes the classname after resize', (done) => {
    window.triggerResize()
    setTimeout(() => {
      assert(!document.documentElement.classList.contains(customClassName))
      done()
    }, 500)
  })
})
