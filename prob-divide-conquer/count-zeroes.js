function countZeroes(arr) {
    let leftIdx = 0;
    let rightIdx = arr.length - 1;

    while (leftIdx <= rightIdx) {
        let midIdx = Math.floor((leftIdx + rightIdx) / 2);
        if (arr[midIdx] === 0 && (arr[midIdx - 1] === 1 || midIdx === 0)) {
            return arr.length - midIdx;
        } else if (arr[midIdx] === 0) {
            rightIdx = midIdx - 1;
        } else if (arr[midIdx] === 1 && arr[midIdx + 1] === 0) {
            return arr.length - (midIdx + 1);
        } else {
            leftIdx = midIdx + 1;
        }
    }

    return 0;
}

module.exports = countZeroes