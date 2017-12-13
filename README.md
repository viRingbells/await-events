# await-events
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

Events that provides method `await` wait till an event occurred. Inspired by `await-event`

## Install

```
$ npm install --save await-events
```

## Usage

```
const AwaitEvents = require('await-events');

// usage 1:
emitter.await = AwaitEvents.await;

// usage 2:
class MyEventEmitter extends AwaitEvents
```

then:

```
await emitter.await('event');
```

if `error` event occurred, it throws the error. You can do `await emitter.await('event', 'exception')` to change error event name.
You can also use `AwaitEvent.await(emitter, 'event')` instead of binding a method on `emitter`

[npm-image]: https://img.shields.io/npm/v/await-events.svg?style=flat-square
[npm-url]: https://npmjs.org/package/await-events
[travis-image]: https://img.shields.io/travis/viRingbells/await-events/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/laviRingbellsrkjs/await-events
[coveralls-image]: https://img.shields.io/codecov/c/github/viRingbells/await-events.svg?style=flat-square
[coveralls-url]: https://codecov.io/github/viRingbells/await-events?branch=master
