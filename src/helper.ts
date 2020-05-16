export const makeFileId = (file: File) => `${file.name}-${file.size}-${file.lastModified}`;

export const readFileBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function () {
            // @ts-ignore
            resolve(reader.result)
        };

        reader.onerror = (err) => {
            reject(err);
        };

        reader.readAsArrayBuffer(file);
    });
};
