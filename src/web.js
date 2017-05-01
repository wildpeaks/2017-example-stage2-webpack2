/* eslint-env browser */
import CoveredClass from 'CoveredClass';
import HalfCoveredClass from 'HalfCoveredClass';
import NotCoveredClass from 'NotCoveredClass';


//---------------------------------------------------------------------------//
// CoveredClass
//---------------------------------------------------------------------------//

const myobj1 = new CoveredClass();

// Instance properties
console.log('[instancePropertyBefore]', myobj1.instancePropertyBefore);
console.log('[instancePropertyAfter]', myobj1.instancePropertyAfter);

// Instance methods
console.log('[boundArrow]', myobj1.boundArrow('AAAAA '));
console.log('[boundFunction]', myobj1.boundFunction('BBBBB '));

// Static
console.log('[staticProperty]', CoveredClass.staticProperty);
console.log('[staticArrow]', CoveredClass.staticArrow('CCCCC '));
console.log('[staticFunction]', CoveredClass.staticFunction('DDDDD '));

// Errors (correctly detected by Typescript :)
// console.log('[Error boundArrow]', CoveredClass.boundArrow('AAAAA '));
// console.log('[Error staticProperty]', myobj1.staticProperty);


//---------------------------------------------------------------------------//
// CoveredClass
//---------------------------------------------------------------------------//

const myobj2 = new HalfCoveredClass();

// Instance properties
console.log('[instancePropertyBefore]', myobj2.instancePropertyBefore);
console.log('[instancePropertyAfter]', myobj2.instancePropertyAfter);

// Instance methods
console.log('[boundArrow]', myobj2.boundArrow('AAAAA '));
console.log('[boundFunction]', myobj2.boundFunction('BBBBB '));

// Static
console.log('[staticProperty]', HalfCoveredClass.staticProperty);
console.log('[staticArrow]', HalfCoveredClass.staticArrow('CCCCC '));
console.log('[staticFunction]', HalfCoveredClass.staticFunction('DDDDD '));


//---------------------------------------------------------------------------//
// CoveredClass
//---------------------------------------------------------------------------//

const myobj3 = new NotCoveredClass();

// Instance properties
console.log('[instancePropertyBefore]', myobj3.instancePropertyBefore);
console.log('[instancePropertyAfter]', myobj3.instancePropertyAfter);

// Instance methods
console.log('[boundArrow]', myobj3.boundArrow('AAAAA '));
console.log('[boundFunction]', myobj3.boundFunction('BBBBB '));

// Static
console.log('[staticProperty]', NotCoveredClass.staticProperty);
console.log('[staticArrow]', NotCoveredClass.staticArrow('CCCCC '));
console.log('[staticFunction]', NotCoveredClass.staticFunction('DDDDD '));

