import { assert } from 'chai'

import bindResizeEvents from '../src'

describe('Library', () => {
  it('exports a function', () => {
    assert(typeof bindResizeEvents === 'function', 'instance not a function')
  })
})
