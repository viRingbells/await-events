/**
 * Events with await method
 **/
'use strict';

const assert        = require('assert');
const debug         = require('debug')('await-events');
const EventEmitter  = require('events');


class AwaitEvent extends EventEmitter {

    async await(...args) {
        return await AwaitEvent.await(this, ...args);
    }

    static async await(...args) {
        if ('string' === typeof args[0]) {
            args.unshift(this);
        }
        let [emitter, eventName, errorEventName] = args;
        debug(`await ${eventName}`);
        assert(emitter instanceof Object && emitter.once instanceof Function
          && emitter.removeListener instanceof Function, 'emitter should be an EventEmitter or something like');
        assert('string' === typeof eventName, 'event name should be a string');
        errorEventName = errorEventName || 'error';
        assert('string' === typeof errorEventName, 'error event name should be a string');
        return new Promise((resolve, reject) => {
            const res = (...args) => {
                debug(`await ${eventName} OK`);
                emitter.removeListener(errorEventName, rej);
                resolve(...args);
            };
            const rej = (...args) => {
                debug(`await ${eventName} ERROR`);
                emitter.removeListener(eventName, res);
                reject(...args);
            };
            emitter.once(errorEventName, rej);
            emitter.once(eventName, res);
        });
    }

}


module.exports = AwaitEvent;
