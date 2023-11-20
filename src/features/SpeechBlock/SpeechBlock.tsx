import { $, component$ } from "@builder.io/qwik";
import voiceVisualizer from "../../assets/sinewaves.mp4";
import "./SpeechButton.css";

interface SpeechBlockProps {
  responseType: string;
  handleTextToText: any;
  handleTextToSpeech: any;
  inputValue?: string;
}
export default component$<SpeechBlockProps>(
  ({ responseType, handleTextToSpeech, handleTextToText }) => {
    const iSActiveMenu = $(() => {
      const menuBtn = document.querySelector(".speechButton");
      const speechMicrophone = document.querySelector(".speechMicrophone")
      let isMenuOpen = false;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      isMenuOpen = !isMenuOpen;
      menuBtn?.classList.toggle("is-active");
      speechMicrophone?.classList.toggle("is-active");

    });
    return (
      <div class="speechButton__wrapper" onClick$={[iSActiveMenu]}>
        <button
          class="speechButton xs:translate-x-28"
          onClick$={
            responseType === "text" ? handleTextToText : handleTextToSpeech
          }
          preventdefault:click
        >
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/9703c752-88a5-4af3-99e5-ad95e588e0f6?apiKey=4ee1ab436a574a03ab1d88779932e6a6&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/9703c752-88a5-4af3-99e5-ad95e588e0f6?apiKey=4ee1ab436a574a03ab1d88779932e6a6&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9703c752-88a5-4af3-99e5-ad95e588e0f6?apiKey=4ee1ab436a574a03ab1d88779932e6a6&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/9703c752-88a5-4af3-99e5-ad95e588e0f6?apiKey=4ee1ab436a574a03ab1d88779932e6a6&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/9703c752-88a5-4af3-99e5-ad95e588e0f6?apiKey=4ee1ab436a574a03ab1d88779932e6a6&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9703c752-88a5-4af3-99e5-ad95e588e0f6?apiKey=4ee1ab436a574a03ab1d88779932e6a6&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/9703c752-88a5-4af3-99e5-ad95e588e0f6?apiKey=4ee1ab436a574a03ab1d88779932e6a6&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/9703c752-88a5-4af3-99e5-ad95e588e0f6?apiKey=4ee1ab436a574a03ab1d88779932e6a6&"
            class=" speechMicrophone aspect-square w-[72px] max-w-full overflow-hidden object-contain object-center"
          />
        </button>
        <video
          autoPlay
          class="speechButton__visualizer xs:h-[200px]  xs:translate-y-36  sm:translate-y-60 md:translate-y-36 lg:translate-y-12"
          muted
          playsInline
          loop
        >
            <source src={voiceVisualizer} type="video/mp4"/>
        </video>
      </div>
    );
  },
);
