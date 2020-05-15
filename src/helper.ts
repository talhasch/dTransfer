export const makeFileId = (file: File) => `${file.name}-${file.size}-${file.lastModified}`;
