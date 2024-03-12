function findRotatedIndex(arr, target) {
    const pivot = findPivot(arr);

    if (pivot === 0) {
        return binarySearch(arr, target, 0, arr.length - 1);
    } else if (arr[arr.length - 1] < target) {
        return binarySearch(arr, target, 0, pivot - 1);
    } else {
        return binarySearch(arr, target, pivot, arr.length - 1);
    }
}

function binarySearch(arr, target, leftIdx, rightIdx) {
    while (leftIdx <= rightIdx) {
        let midIdx = Math.floor((leftIdx + rightIdx) / 2);
        if (arr[midIdx] === target) {
            return midIdx;
        } else if (arr[midIdx] > target) {
            rightIdx = midIdx - 1;
        } else {
            leftIdx = midIdx + 1;
        }
    }

    return -1
}

function findPivot(arr) {
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
module.exports = findRotatedIndex