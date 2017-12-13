'use strict';


const AwaitEvent    = require('await-events');
const EventEmitter  = require('events');


describe('await events on an native event emitter', () => {
    let emitter = new EventEmitter();
    emitter.await = AwaitEvent.await;
    let interval, timeout;
    before(() => {
      interval = setInterval(() => emitter.emit("OK"), 100);
      timeout = setTimeout(() => emitter.emit("error", new Error("FAKE ERROR")), 550);
    })

    after(() => {
        clearInterval(interval);
        clearTimeout(timeout);
    });

    it('should await 5 times and catch an error', async () => {
        const records = [];
        try {
            while (true) {
                records.push(Date.now());
                await emitter.await('OK');
            }
        }
        catch (error) {
            records.push(error);
        }
        records.length.should.be.exactly(7);
        for (let i = 0; i < 5; i++) {
            Math.abs(records[i + 1] - records[i]).should.be.above(80).and.below(120);
        }
        records[6].should.an.instanceOf(Error).with.property('message', 'FAKE ERROR');
    });

});


describe('await events on an extended event emitter', () => {
    class MyEventEmitter extends AwaitEvent {}
    let emitter = new MyEventEmitter();
    let interval, timeout;
    before(() => {
      interval = setInterval(() => emitter.emit("OK"), 100);
      timeout = setTimeout(() => emitter.emit("error", new Error("FAKE ERROR")), 550);
    })

    after(() => {
        clearInterval(interval);
        clearTimeout(timeout);
    });

    it('should await 5 times and catch an error', async () => {
        const records = [];
        try {
            while (true) {
                records.push(Date.now());
                await emitter.await('OK');
            }
        }
        catch (error) {
            records.push(error);
        }
        records.length.should.be.exactly(7);
        for (let i = 0; i < 5; i++) {
            Math.abs(records[i + 1] - records[i]).should.be.above(80).and.below(120);
        }
        records[6].should.an.instanceOf(Error).with.property('message', 'FAKE ERROR');
    });

});
