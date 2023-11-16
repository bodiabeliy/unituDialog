export const toBase64 = (file: File | any): Promise<string | ArrayBuffer | null> => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        // reader.onload = function () {
        //     const arrayBuffer = reader.result;
        //
        //     const base64str = btoa(arrayBuffer);
        // }
    }
)
