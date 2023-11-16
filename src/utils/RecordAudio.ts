export const recordAudio = (reqStream?: any): Promise<{start():void, stop():Promise<any>}> => {
    return new Promise(resolve => {
        navigator.mediaDevices.getUserMedia({ audio: {channelCount: 1} })
            .then(stream => {
                const mediaRecorder = new MediaRecorder(reqStream ? reqStream : stream, {mimeType: "audio/webm"});
                console.log(mediaRecorder);
                const audioChunks:any = [];

                mediaRecorder.addEventListener("dataavailable", event => {
                    audioChunks.push(event.data);
                });

                const start = () => {
                    mediaRecorder.start();
                };

                const stop = () => {
                    return new Promise(resolve => {
                        mediaRecorder.addEventListener("stop", () => {
                            const audioBlob = new Blob(audioChunks, {type: "audio/wav"});
                            const audioUrl = URL.createObjectURL(audioBlob);
                            const audio = new Audio(audioUrl);
                            const play = async () => {
                                return audio.play;
                            };
                            resolve({ audioBlob, audioUrl, play });
                        });

                        mediaRecorder.stop();
                    });
                };

                resolve({ start, stop });
            });
    });
};
