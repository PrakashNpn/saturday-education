/* eslint-disable @typescript-eslint/no-require-imports */
// Two stand-ins so app modules load under Node's test runner:
// - `server-only` is resolved by Next's bundler, not Node, so it gets an empty module.
// - tsx hands libphonenumber-js's CommonJS build its JSON metadata wrapped as { default },
//   which the library rejects. Next bundles it correctly, so this only affects tests; its
//   ES build loads fine, so requests for the CommonJS entry are pointed there.
const Module = require('node:module')
const path = require('node:path')
const original = Module._resolveFilename
Module._resolveFilename = function (request, ...rest) {
  if (request === 'server-only') return require.resolve('./empty.cjs')
  if (request === 'libphonenumber-js/min') {
    return path.join(path.dirname(require.resolve('libphonenumber-js/package.json')), 'min', 'index.js')
  }
  return original.call(this, request, ...rest)
}
