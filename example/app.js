var Filofax = require('../src/filofax');
var trace = new Filofax();

class A {

  constructor(name) {
    trace.shot();
    this.name = name;
    console.log(`${this.name} love apple!`);
  }

  eat(type) {
    trace.shot();
    console.log('-------start eating apple-----------')
    for(var item of type) {
      console.log(`${this.name} eat ${item} apple!`);
    }
    console.log('-------end eating apple-------------')
  }

}

class B {

  constructor(name) {
    trace.shot();
    this.name = name;
    console.log(`${this.name} love pear!`);
  }

  eat(type) {
    trace.shot();
    console.log('-------start eating pear------------')
    for(var item of type) {
      console.log(`${this.name} eat ${item} pear!`);
    }
    console.log('-------end eating pear--------------')
  }
}

class C {

  constructor() {
    this.children = [
      {
        name: 'Rose',
        love: 'apple',
        type: ['red', 'green', 'yellow']
      },
      {
        name: 'Tom',
        love: 'pear',
        type: ['China', 'Japan']
      },
      {
        name: 'Jack',
        love: 'apple',
        type: ['small', 'big']
      }
    ];
    this.fruits = [];
  }

  share() {
    trace.shot({type: 'root'});
    for(var item of this.children) {
      switch (item.love) {
        case 'apple':
          var fruit = new A(item.name);
          break;
        case 'pear':
          var fruit = new B(item.name);
          break;
        default:
          break;
      }
      if (fruit) {
        this.fruits.push(fruit);
      }
    }
  }

  eat() {
    trace.shot({type: 'root'});
    for(var fruit of this.fruits) {
      var name = fruit.name;
      for(var item of this.children) {
        if (item.name === name) {
          fruit.eat(item.type);
          continue;
        }
      }
    }
  }

  fake() {
    trace.shot({type: 'root'});
    throw new Error('school fake error');
  }

}

window.onerror = function (msg, url, line, column, err) {
  trace.shot(err);
  trace.dump();
}

var school = new C();
school.share();
school.eat();
// trigger error
school.fake();
