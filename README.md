# resizestart & resizestop

Debounced `resizestart` and `resizestop` events on the window. Great for deactivating animations
during window resize.

## Installation

```bash
npm install resize-start-stop
```

## Usage

```js
import bindResizeEvents from 'resize-start-stop'

bindResizeEvents()

window.addEventListener('resizestart', () => { console.log('Start') })
window.addEventListener('resizestop', () => { console.log('Stop') })
```

### Unbinding events

```js
import bindResizeEvents, { unbindResizeEvents } from 'resize-start-stop'

// Bind events
bindResizeEvents()

// Unbind at later stage
unbindResizeEvents()
```

### Toggle class name during resize

The package includes a helper for the most common use case: toggling a
classname on the `html` element during resize.

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
