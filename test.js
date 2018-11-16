const _ = require('lodash')
var users = {
  'barney':  { 'age': 36, 'active': true },
  'fred':    { 'age': 40, 'active': false },
  'pebbles': { 'age': 1,  'active': true }
};

let t = _.filter(users, function)
console.log(t)
// class Parent {
//     constructor() {
//         this.originalProp = 'original'
//     }
// }
//
// let parent = new Parent()
//
// console.log(parent)
// // console.log(Parent)
//
// class Child extends Parent {
//     constructor() {
//         super()
//         this.farts = 'butts'
//     }
// }
//
// let child = new Child()
//
// console.log(child)

// var target = {}
// var handler = {}
// var proxy = new Proxy(target, handler)
// proxy.a = 'b'
// console.log(target.a)
// console.log(target)
// // <- 'b'
// console.log(proxy.c === undefined)


// const EventEmitter = require('events');
//
// class MyEmitter extends EventEmitter {}
//
// const myEmitter = new MyEmitter();
// myEmitter.on('event', () => {
//   console.log('an event occurred!');
// });
// myEmitter.emit('event');
