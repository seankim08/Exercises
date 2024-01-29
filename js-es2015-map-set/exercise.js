new Set([1, 1, 2, 2, 3, 4]) // {1, 2, 3, 4}

const ref = [...new Set("referee")].join("") // 'ref'

let m = new Map();
m.set([1, 2, 3], true);
m.set([1, 2, 3], false);

// m will be {[1, 2, 3] => true, [1, 2, 3], false}

function hasDuplicate(arr) {
    const set = new Set(arr);
    return arr.length > set.size ? true : false;
}

function vowelCount(string) {
    const count = new Map();
    const vowels = new Set('aeiuo');
    [...string].forEach((char) => {
        if (vowels.has(char))
            count.has(char) ? count.set(char, count.get(char) + 1) : count.set(char, 1);
    })

    return count;
}