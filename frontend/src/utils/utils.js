export const idGenerator = (idLength = 16, onlyAlphabets = false) => {
    let chars =
        "0123456789QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm[]{}<>:?/!@#%^&*()+0123456789QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm[]{}<>:?/!@#%^&*()+";

    if (onlyAlphabets)
        chars =
            "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";

    let firstChar = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    let id = firstChar[Math.floor(Math.random() * firstChar.length)];

    for (let i = 0; i < idLength - 1; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        id += chars[randomNumber];
    }
    return id;
};

export function imageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = () => {
            reject(reader.error);
        };

        reader.readAsDataURL(file);
    });
}
