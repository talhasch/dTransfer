import axios from 'axios';


export const upload = async (buffer: ArrayBuffer, fileName: string): Promise<string> => {
    const formData = new FormData();
    formData.append('file', new File([buffer], fileName));

    return axios.post(`https://siasky.net/skynet/skyfile/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (e) => {
            const percentCompleted = Math.round((e.loaded * 100) / e.total);
            console.log(percentCompleted)
        }
    }).then(r => {
        const resp = r.data;

        return `https://siasky.net/${resp.skylink}`;
    });
};
