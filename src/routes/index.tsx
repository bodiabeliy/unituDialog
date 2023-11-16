import type { NoSerialize} from "@builder.io/qwik";
import {$, component$, noSerialize, useSignal, useStore, useVisibleTask$} from "@builder.io/qwik";
import type {DocumentHead} from "@builder.io/qwik-city";
import TextBlock from "~/components/ui/message/TextBlock";
import {toBase64} from "~/utils/toBase64";
import {speech_to_speech, speech_to_text, text_to_speech, text_to_text} from "~/utils/fetch/aiFetches";
import {NotWorking, Working} from "~/components/ui/IconMicrophone"
import Loader from "~/components/ui/Loader";
import {WavRecorder} from "webm-to-wav-converter";

export interface Messages {
    from: "agent" | "customer";
    content: string;
    audio?: boolean;
}

const langOpts = [
    {
        value: "en_GB",
        name: "English"
    },

    {
        value: "uk_UA",
        name: "Ukrainian"
    },
    {
        value: "it_IT",
        name: "Italian"
    },
    {
        value: "es_ES",
        name: "Spanish"
    },
    {
        value: "fr_FR",
        name: "French"
    },
    {
        value: "ru_RU",
        name: "russian"
    },
]

export default component$(() => {
    const language = useSignal('en_US');
    const text = useSignal('');
    const isLoading = useSignal(false);
    const freeze = useSignal(false);
    const responseType = useSignal('text');
    const messages = useStore<{data: Messages[] }>({data: []})
    const isRecording = useSignal(false);
    const recorder = useSignal<NoSerialize<any> | null>(null)
    const handleSpeechToText = $(async () => {
        if (isLoading.value) return;
        if (!recorder.value) recorder.value = noSerialize(new WavRecorder())

        if (isRecording.value) {
            await recorder.value.stop()
            isRecording.value = false;
            setTimeout(async () => {
                isLoading.value = true;
                const blob = await recorder.value.getBlob(false);
                const base64String = await toBase64(blob);
                messages.data = [...messages.data,
                    {from: "customer", content: (base64String as string).replace('data:audio/wave;base64,', 'data:audio/wav;base64,'),audio:true}];

                const data = {
                    content: (base64String as string).replace('data:audio/wave;base64,', ''),
                    language_code: language.value
                };
                await speech_to_text(data)
                    .then(res => {
                        messages.data = [...messages.data, {from: "agent", content: res.content}]
                    })
                    .catch(err => console.log(err))
                    .finally(() => {
                        freeze.value = false;
                        isLoading.value = false;
                    });
            }, 100)
        }
        else {
            isRecording.value = true;
            freeze.value = true;
            await recorder.value.start({audio: {channelCount: 1}});
        }
    });
    const handleTextToText = $(async (data: string) => {
        if (text.value === '') return;
        messages.data = [...messages.data, {from: "customer", content: data}]
        text.value = '';
        freeze.value = true;
        isLoading.value = true;
        const body = {"content": data, "language_code":language.value};
        await text_to_text(body)
            .then(res => messages.data = [...messages.data, {from: "agent", content: res.content}])
            .catch(() => messages.data = [...messages.data, {from: "agent", content: "!ERROR OCCURED!"}])
            .finally(() => {
                freeze.value = false;
                isLoading.value = false;
            });
    });
    const handleTextToSpeech = $(async (data: string) => {
        if (text.value === '') return;
        messages.data = [...messages.data, {from: "customer", content: data}]
        text.value = '';
        isLoading.value = true;
        freeze.value = true;
        const body = {"content": data, "language_code":language.value};
        await text_to_speech(body)
            .then(res => messages.data = [...messages.data, {from: "agent", content: "data:audio/wav;base64," + res.content, audio: true}])
            .catch((err) => console.log(err))
            .finally(() => {
                freeze.value = false
                isLoading.value = false;
            });
    });
    const handleSpeechToSpeech = $(async () => {
        if (isLoading.value) return;
        if (!recorder.value) recorder.value = noSerialize(new WavRecorder())

        if (isRecording.value) {
            await recorder.value.stop()
            isRecording.value = false;
            setTimeout(async () => {
                isLoading.value = true;
                const blob = await recorder.value.getBlob(false);
                const base64String = await toBase64(blob);
                messages.data = [...messages.data,
                    {from: "customer", content: (base64String as string).replace('data:audio/wave;base64,', 'data:audio/wav;base64,'), audio:true}];

                const data = {
                    content: (base64String as string).replace('data:audio/wave;base64,', ''),
                    language_code: language.value
                };
                await speech_to_speech(data)
                    .then(res => messages.data = [...messages.data, {from: "agent", content: "data:audio/wav;base64," + res.content, audio: true}])
                    .catch(err => console.log(err))
                    .finally(() => {
                        freeze.value = false;
                        isLoading.value = false;
                    });
            }, 100)
        }
        else {
            isRecording.value = true;
            freeze.value = true;
            await recorder.value.start({audio: {channelCount: 1}});
        }
    });


    useVisibleTask$(({track}) => {
        track(() => messages.data);
        const container = document!.querySelector('#container')!
        container.scrollTop = container.scrollHeight;
    });


    return (
        <main class={'w-screen h-screen flex justify-center items-center'}>
            <audio src=""></audio>
            <div class={'md:w-[670px] w-screen h-[calc(100%-90px)] rounded-xl shadow-2xl'}>
                <div
                    class={'w-full h-16 bg-[#123456] rounded-t-xl flex gap-3 justify-between items-center text-xl tracking-wide px-10'}>
                  <span class={'text-white font-bold'}>
                    How can I help?
                  </span>
                    <div class={'flex gap-4 items-center'}>
                        <select name="langs" class={'text-base p-0.5 pb-1 bg-transparent text-white outline-0 border-[1px] border-slate-300 rounded-lg'} onChange$={e => language.value = (e.target).value}>
                            {langOpts.map((el,i) =>
                                <option value={el.value} key={i} class={'text-black'}>
                                    {el.name}
                                </option>
                            )}
                        </select>
                        <button onClick$={() => responseType.value === 'text' ? responseType.value = 'audio' : responseType.value = "text"}
                                class={'text-base rounded-lg px-2 py-1.5 text-white font-medium underline underline-offset-1'}>
                            AI - {responseType.value}
                        </button>
                    </div>

                </div>
                <div class={'h-[calc(100%-110px)] flex flex-col gap-3 py-3 px-2 overflow-y-scroll'} id={"container"}>
                    {
                        messages.data.map((el, i) =>
                            <TextBlock data={el} key={i}/>
                        )
                    }
                    <div class={'w-5 h-5'}>
                        {isLoading.value && <Loader/>}
                    </div>

                </div>
                <form class={`border-t-[1px] border-[#abcdef] h-[46px] flex rounded-b-xl ${freeze.value && "bg-gray-200"}`}>
                    <input class={`w-full px-2 pb-1.5 h-full outline-0 rounded-bl-xl ${freeze.value && "bg-gray-200"}`}
                           placeholder={freeze.value ? "Wait for the AI reply" : "Type a message"}
                           disabled={freeze.value}
                           type="text"
                           value={text.value}
                           onInput$={e => text.value = (e.target as HTMLInputElement).value}/>

                    <div class={'flex gap-2'}>
                        <button class={`${freeze.value ? "bg-gray-700" : "bg-[#123456]"}  px-2.5 text-white`} type={"submit"}
                                onClick$={() => responseType.value === "text" ? handleTextToText(text.value) : handleTextToSpeech(text.value)} preventdefault:click>
                            {freeze.value ? "Wait" : "Send"}
                        </button>
                        <button class={`${freeze.value && "bg-gray-200"}`} onClick$={responseType.value === "text" ? handleSpeechToText : handleSpeechToSpeech} preventdefault:click>
                            <span class={'w-6 h-6'}>
                                {isRecording.value ? <Working/> : <NotWorking/>}
                            </span>
                        </button>
                    </div>
                </form>

            </div>
        </main>
    );
});

export const head: DocumentHead = {
    title: "AI test",
    meta: [
        {
            name: "description",
            content: "AI test",
        },
    ],
};
