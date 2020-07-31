# resizestart & resizestop

[![NPM version](https://img.shields.io/npm/v/resize-start-stop)](https://www.npmjs.com/package/resize-start-stop)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/resize-start-stop?label=size)](https://bundlephobia.com/result?p=resize-start-stop)
[![GitHub license](https://img.shields.io/github/license/daun/resize-start-stop)](./LICENSE)
![Codecov](https://img.shields.io/codecov/c/github/daun/resize-start-stop)

Debounced `resizestart` and `resizestop` events on the window. Great for
disabling transitions and animations during window resize.

## Installation

```bash
npm install resize-start-stop
```

## Usage

Import and call `bindResizeEvents()` to install debounced `resizestart` and
`resizestop` events on the window.

```js
import bindResizeEvents from 'resize-start-stop'

bindResizeEvents()

window.addEventListener('resizestart', () => { console.log('Start') })
window.addEventListener('resizestop', () => { console.log('Stop') })
```

### Cleaning up

If you don't need the installed events anymore, import and call
`unbindResizeEvents()`.

```js
import bindResizeEvents, { unbindResizeEvents } from 'resize-start-stop'

// Bind events
bindResizeEvents()

// Unbind at later stage
unbindResizeEvents()
```

### Toggle class name during resize

The package includes a helper for the most common use case: toggling a
class name on the `html` element during resize.

```js
import { toggleClassDuringResize } from 'resize-start-stop'

// Default options
toggleClassDuringResize({
  className: 'is-resizing',
  element: document.documentElement,
  wait: 200
})
```

## License

[MIT License](https://opensource.org/licenses/MIT) © Philipp Daun
