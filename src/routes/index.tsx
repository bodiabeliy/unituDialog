import {
  $,
  NoSerialize,
  component$,
  noSerialize,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { WavRecorder } from "webm-to-wav-converter";
import Loader from "~/shared/Loader/Loader";
// import { NotWorking, Working } from "~/components/ui/IconMicrophone";
// import Loader from "~/components/ui/Loader";
import TextBlock from "~/features/TextBlock/TextBlock";
import {
  speech_to_speech,
  speech_to_text,
  text_to_speech,
  text_to_text,
} from "~/utils/fetch/aiFetches";
import { toBase64 } from "~/utils/toBase64";
import MenuActionButtons from "~/widgets/menuActionButtons/menuActionButtons";
import SpeechBlock from "~/features/SpeechBlock/SpeechBlock";

export interface Messages {
  sender: "agent" | "customer";
  content: string;
  audio?: boolean;
}

// const langOpts = [
//     {
//         value: "en_GB",
//         name: "English"
//     },

//     {
//         value: "uk_UA",
//         name: "Ukrainian"
//     },
//     {
//         value: "it_IT",
//         name: "Italian"
//     },
//     {
//         value: "es_ES",
//         name: "Spanish"
//     },
//     {
//         value: "fr_FR",
//         name: "French"
//     },
//     {
//         value: "ru_RU",
//         name: "russian"
//     },
// ]

export default component$(() => {
  const language = useSignal("en_US");
  const text = useSignal("");
  const isLoading = useSignal(false);
  const freeze = useSignal(false);
  const responseType = useSignal("text");
  const messages = useStore<{ data: Messages[] }>({ data: [] });
  const isRecording = useSignal(false);
  const recorder = useSignal<NoSerialize<any> | null>(null);

  const handleSpeechToText = $(async () => {
    if (isLoading.value) return;
    if (!recorder.value) recorder.value = noSerialize(new WavRecorder());

    if (isRecording.value) {
      await recorder.value.stop();
      isRecording.value = false;
      setTimeout(async () => {
        isLoading.value = true;
        const blob = await recorder.value.getBlob(false);
        const base64String = await toBase64(blob);
        messages.data = [
          ...messages.data,
          {
            sender: "customer",
            content: (base64String as string).replace(
              "data:audio/wave;base64,",
              "data:audio/wav;base64,",
            ),
            audio: true,
          },
        ];

        const data = {
          content: (base64String as string).replace(
            "data:audio/wave;base64,",
            "",
          ),
          language_code: language.value,
        };
        await speech_to_text(data)
          .then((res) => {
            messages.data = [
              ...messages.data,
              { sender: "agent", content: res.content },
            ];
          })
          .catch((err) => console.log(err))
          .finally(() => {
            freeze.value = false;
            isLoading.value = false;
          });
      }, 100);
    } else {
      isRecording.value = true;
      freeze.value = true;
      await recorder.value.start({ audio: { channelCount: 1 } });
    }
  });
  const handleTextToText = $(async (data: string) => {
    if (text.value === "") return;
    messages.data = [...messages.data, { sender: "customer", content: data }];
    text.value = "";
    freeze.value = true;
    isLoading.value = true;
    const body = { content: data, language_code: language.value };
    await text_to_text(body)
      .then(
        (res) =>
          (messages.data = [
            ...messages.data,
            { sender: "agent", content: res.content },
          ]),
      )
      .catch(
        () =>
          (messages.data = [
            ...messages.data,
            { sender: "agent", content: "!ERROR OCCURED!" },
          ]),
      )
      .finally(() => {
        freeze.value = false;
        isLoading.value = false;
      });
  });
  const handleTextToSpeech = $(async (data: string) => {
    if (text.value === "") return;
    messages.data = [...messages.data, { sender: "customer", content: data }];
    text.value = "";
    isLoading.value = true;
    freeze.value = true;
    const body = { content: data, language_code: language.value };
    await text_to_speech(body)
      .then(
        (res) =>
          (messages.data = [
            ...messages.data,
            {
              sender: "agent",
              content: "data:audio/wav;base64," + res.content,
              audio: true,
            },
          ]),
      )
      .catch((err) => console.log(err))
      .finally(() => {
        freeze.value = false;
        isLoading.value = false;
      });
  });
  const handleSpeechToSpeech = $(async () => {
    if (isLoading.value) return;
    if (!recorder.value) recorder.value = noSerialize(new WavRecorder());

    if (isRecording.value) {
      await recorder.value.stop();
      isRecording.value = false;
      setTimeout(async () => {
        isLoading.value = true;
        const blob = await recorder.value.getBlob(false);
        const base64String = await toBase64(blob);
        messages.data = [
          ...messages.data,
          {
            sender: "customer",
            content: (base64String as string).replace(
              "data:audio/wave;base64,",
              "data:audio/wav;base64,",
            ),
            audio: true,
          },
        ];

        const data = {
          content: (base64String as string).replace(
            "data:audio/wave;base64,",
            "",
          ),
          language_code: language.value,
        };
        await speech_to_speech(data)
          .then(
            (res) =>
              (messages.data = [
                ...messages.data,
                {
                  sender: "agent",
                  content: "data:audio/wav;base64," + res.content,
                  audio: true,
                },
              ]),
          )
          .catch((err) => console.log(err))
          .finally(() => {
            freeze.value = false;
            isLoading.value = false;
          });
      }, 100);
    } else {
      isRecording.value = true;
      freeze.value = true;
      await recorder.value.start({ audio: { channelCount: 1 } });
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => messages.data);
    const container = document!.querySelector("#container")!;
    container.scrollTop = container.scrollHeight;
  });






  return (
    <div class="flex flex-col items-center bg-neutral-900 px-5">
      <div
        id="container"
        class="mb-24 mt-20 flex min-h-[650px] w-full max-w-[626px] flex-col items-center rounded-[30px] border border-solid border-[color:var(--1,#9363FD)] bg-[linear-gradient(180deg,#000_0%,#171717_100%)] px-20 pb-5 shadow-xl backdrop-blur-[11.267770767211914px] max-md:my-10 max-md:max-w-full max-md:px-5"
      >
        {/* navbar */}
       <MenuActionButtons />
        <div class="dialog__content max-h-[500px] overscroll-auto	">
        {messages.data.map((el, i) => (
          <TextBlock data={el} key={i} />
        ))}
          <div class="mt-2 flex justify-between gap-4 self-stretch max-md:mr-px max-md:max-w-full max-md:flex-wrap">
            <div class={"h-5 w-5"}>
              {isLoading.value && <Loader loadingText="Loading..." />}
            </div>
          </div>
        </div>
        <SpeechBlock 
          responseType={responseType.value} 
          handleTextToText={handleSpeechToText} 
          handleTextToSpeech={handleSpeechToSpeech} 
          inputValue={text.value}
        />
        <div class="mt-11 flex w-[365px] max-w-full items-stretch justify-center gap-4 self-center max-md:mt-10">
          <input
            onInput$={e => text.value = (e.target as HTMLInputElement).value}
           class="grow whitespace-nowrap rounded-xl border-[0.9px] border-solid border-[color:var(--,rgba(255,255,255,0.63))] bg-zinc-800 px-3.5 py-4 text-base font-medium leading-6 tracking-wide text-neutral-200" />

          <div class="flex aspect-[1.0444444444444445] flex-col items-center justify-center rounded-xl border border-solid border-[color:var(--1,#9363FD)] bg-zinc-800 px-3.5 py-4">
            <button
              onClick$={() =>
                responseType.value === "text"
                  ? handleTextToText(text.value)
                  : handleTextToSpeech(text.value)
              }
              preventdefault: click
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f34ccbaa-bb12-44a5-9746-572490933151?apiKey=4ee1ab436a574a03ab1d88779932e6a6&"
                class="aspect-[1.38] w-[18px] overflow-hidden object-contain object-center"
              />
            </button>
          </div>
        </div>

        {/* marker audio */}
        {/* <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a058c78-9a4d-4bb9-b464-76ec8792a3b2?apiKey=4ee1ab436a574a03ab1d88779932e6a6&"
          class="mt-1.5 aspect-[1.04] w-[27px] max-w-full overflow-hidden object-contain object-center"
        /> */}
      </div>
    </div>
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
