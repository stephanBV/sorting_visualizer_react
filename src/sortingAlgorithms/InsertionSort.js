export function doInsertionSort(array) {
    const animations = [];
    console.log(array);
    for (let i=1; i<array.length; i++) {
        let key = array[i];

        let j = i-1;
        while (j>=0 && key<array[j]) {
            array[j + 1] = array[j];
            j-=1;
        }
        array[j+1]=key;
    }
    console.log('sorted:', array);
    return animations
}