export const arrayDimension = (array: Array<any>,num: number) => {
    const objArray = [...array];
    const newArray = [];
    while (objArray.length > 0) {
        newArray.push(objArray.splice(0,num))
    }
    return newArray;
}
