function findFloor(arr, target) {
    let leftIdx = 0;
    let rightIdx = arr.length - 1;

    while (leftIdx <= rightIdx) {
        let midIdx = Math.floor((leftIdx + rightIdx) / 2);
        if (arr[midIdx] <= target && (midIdx === arr.length - 1 || arr[midIdx + 1] > target)) {
            return arr[midIdx];
        } else if (arr[midIdx] > target) {
            rightIdx = midIdx - 1;
        } else {
            leftIdx = midIdx + 1;
        }
    }

    return -1;
}

module.exports = findFloor