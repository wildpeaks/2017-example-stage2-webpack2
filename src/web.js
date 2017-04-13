/* eslint-env browser */
import MyClass from 'MyClass';
const myobj = new MyClass();

// Instance properties
console.log('[instancePropertyBefore]', myobj.instancePropertyBefore);
console.log('[instancePropertyAfter]', myobj.instancePropertyAfter);

// Instance methods
console.log('[boundArrow]', myobj.boundArrow('AAAAA '));
console.log('[boundFunction]', myobj.boundFunction('BBBBB '));

// Static
console.log('[staticProperty]', MyClass.staticProperty);
console.log('[staticArrow]', MyClass.staticArrow('CCCCC '));
console.log('[staticFunction]', MyClass.staticFunction('DDDDD '));
