interface fetchData {
    content: string;
    language_code: string;
}

export const text_to_text = async (data: fetchData) => {
    const url = 'https://api.uwpai.net/api/assistant/text-to-text';
    return await fetch(url,
        {
            body: JSON.stringify(data),
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
};

export const text_to_speech = async (data: fetchData) => {
    const url = 'https://api.uwpai.net/api/assistant/text-to-speech';
    return await fetch(url,
        {
            body: JSON.stringify(data),
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
}

export const speech_to_text = async (data: fetchData) => {
    const url = "https://api.uwpai.net/api/assistant/speech-to-text";
    return await fetch(url,
        {
            body: JSON.stringify(data),
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json());
}

export const speech_to_speech = async (data: fetchData) => {
    const url = "https://api.uwpai.net/api/assistant/speech-to-speech";
    return await fetch(url,
        {
            body: JSON.stringify(data),
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json());
}

