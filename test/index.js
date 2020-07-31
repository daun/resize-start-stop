import { assert } from 'chai'

import createDocument from './helpers/dom'

import {
  bindResizeEvents,
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

  it('adds a resizestart event', (done) => {
    let count = 0
    window.addEventListener('resizestart', () => count++)
    window.triggerResize()
    setTimeout(() => (assert(count === 1), done()), 500)
  })

  it('adds a resizestop event', (done) => {
    let count = 0
    window.addEventListener('resizestop', () => count++)
    window.triggerResize()
    setTimeout(() => (assert(count === 1), done()), 500)
  })

  it('resizestart triggers only once', (done) => {
    let count = 0
    window.addEventListener('resizestart', () => count++)
    window.triggerResize()
    setTimeout(() => (assert(count === 1), done()), 500)
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

  it('unbinds the resizestart event', (done) => {
    let count = 0
    window.addEventListener('resizestart', () => count++)
    window.triggerResize()
    setTimeout(() => (assert(count === 0), done()), 500)
  })

  it('unbinds the resizestop event', (done) => {
    let count = 0
    window.addEventListener('resizestop', () => count++)
    window.triggerResize()
    setTimeout(() => (assert(count === 0), done()), 500)
  })
})

describe('toggleClassDuringResize', function () {
  this.timeout(timeout)

  const className = 'is-resizing'
  const element = () => document.documentElement

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
    assert(element().classList.contains(className))
  })

  it('removes the classname after resize', (done) => {
    window.triggerResize()
    setTimeout(
      () => (assert(!element().classList.contains(className)), done()),
      500
    )
  })
})

describe('toggleClassDuringResize with options', function () {
  this.timeout(timeout)

  const className = 'custom-resize-classname'
  const element = () => document.body

  beforeEach(function () {
    this.doc = createDocument()
    toggleClassDuringResize({ className, element: element() })
  })
  afterEach(function () {
    unbindResizeEvents()
    this.doc()
  })

  it('adds a custom classname on resize', () => {
    window.triggerResize()
    assert(element().classList.contains(className))
  })

  it('removes the custom classname after resize', (done) => {
    window.triggerResize()
    setTimeout(
      () => (assert(!element().classList.contains(className)), done()),
      500
    )
  })
})
