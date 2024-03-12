function findRotationCount(arr) {
    if (arr.length === 0) {
        return 0;
    }

    let leftIdx = 0;
    let rightIdx = arr.length - 1;

    while (leftIdx <= rightIdx) {
        let midIdx = Math.floor((leftIdx + rightIdx) / 2);
        if (arr[midIdx + 1] < arr[midIdx]) {
            return midIdx + 1;
        } else if (arr[leftIdx] <= arr[midIdx]) {
            leftIdx = midIdx + 1;
        } else {
            rightIdx = midIdx - 1;
        }
    }

    return 0;
}

module.exports = findRotationCount