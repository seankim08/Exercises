
const filterOutOdds = (...nums) => nums.filter((num) => num % 2 === 0);

const findMin = (...nums) => Math.min(...nums);

const mergeObjects = (obj1, obj2) => ({...obj1, ...obj2});

const doubleAndReturnArgs = (arr, ...nums) => ([...arr, ...nums.map((num) => num * 2)]);

/** remove a random element in the items array
and return a new array without that item. */

function removeRandom(items) {
    const index = Math.floor(Math.random() * items.length);
    //items.splice(index, 1);
    //return items;
    return [...items.slice(0, index), ...items.slice(index + 1)]
}

/** Return a new array with every item in array1 and array2. */

function extend(array1, array2) {
    return [...array1, ...array2];
}

/** Return a new object with all the keys and values
from obj and a new key/value pair */

function addKeyVal(obj, key, val) {
    return {...obj, [key] : val};
}


/** Return a new object with a key removed. */

function removeKey(obj, key) {
    ({[key] : undefined, ...obj} = obj);
    return obj;
}


/** Combine two objects and return a new object. */

function combine(obj1, obj2) {
    return {...obj1, ...obj2};
}


/** Return a new object with a modified key and value. */

function update(obj, key, val) {
    return {...obj, [key] : val};
}