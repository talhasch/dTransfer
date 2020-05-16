import axios from 'axios';

type SkynetResponse = {
    skylink: string,
    merkleroot: string,
    bitfield: number
}

export const upload = async (buffer: ArrayBuffer, fileName: string, onProgress: (p: number) => void): Promise<string> => {
    const formData = new FormData();
    formData.append('file', new File([buffer], fileName));

    return axios.post(`https://siasky.net/skynet/skyfile/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (e: ProgressEvent) => {
            const percentCompleted = Math.round((e.loaded * 100) / e.total);
            onProgress(percentCompleted);
        }
    }).then(r => {
        const resp: SkynetResponse = r.data;

        return resp.skylink;
    });
};
