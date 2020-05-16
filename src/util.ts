export const arrayChunk = (arr: Array<any>, size: number): Array<Array<any>> => {

    const temporal = [];

    for (let i = 0; i < arr.length; i += size) {
        temporal.push(arr.slice(i, i + size));
    }

    return temporal;
};
