
function sortedFrequency(arr, target) {
    let leftIdx = pivot = findLeftPivot(arr, target);
    let rightIdx = arr.length - 1;

    while (leftIdx <= rightIdx) {
        let midIdx = Math.floor((leftIdx + rightIdx) / 2);
        if (arr[midIdx] === target && (arr[midIdx + 1] > target || rightIdx === leftIdx)) {
            return midIdx + 1 - pivot;
        } else if (arr[midIdx] > target) {
            rightIdx = midIdx - 1;
        } else {
            leftIdx = midIdx + 1;
        }
    }

    return -1;
}

function findLeftPivot(arr, target) {
    if (arr[0] === target) {
        return 0;
    }

    let leftIdx = 0;
    let rightIdx = arr.length - 1;

    while (leftIdx <= rightIdx) {
        let midIdx = Math.floor((leftIdx + rightIdx) / 2);
        if (arr[midIdx] === target && arr[midIdx - 1] < target) {
            return midIdx;
        } else if (arr[midIdx] === target && arr[midIdx - 1] >= target) {
            rightIdx = midIdx - 1;
        } else {
            leftIdx = midIdx + 1;
        }
    }

    return 0;
}

module.exports = sortedFrequency