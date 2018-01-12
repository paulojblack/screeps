class Parent {
    constructor() {
        this.originalProp = 'original'
    }
}

let parent = new Parent()

console.log(parent)
// console.log(Parent)

class Child extends Parent {
    constructor() {
        super()
        this.farts = 'butts'
    }
}

let child = new Child()

console.log(child)
