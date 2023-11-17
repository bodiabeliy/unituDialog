import { Signal, component$ } from "@builder.io/qwik";
import type { Messages } from "~/routes";

interface BLockProps {
  data: Messages;
  isLoading?:Signal<boolean>
}

export default component$<BLockProps>(({ data }) => {
  
  return !data.audio ? (
    <>
      {data.sender == "customer" ? (
        <div class="customer m-3">
          <div class="mt-8 flex items-stretch justify-between gap-4 self-stretch max-md:mr-px max-md:max-w-full max-md:flex-wrap">
            <div class="flex grow basis-[0%] flex-col items-stretch justify-center">
              <div
                class={
                  
                  "text-right text-lg leading-6 text-neutral-200 m-8"
                  // : "text-violet-300"
                }
              >
                {data.content}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div class="agent flex  mt-3 mb-3">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e011c616-328d-4bec-916a-72aa52a1cb04?apiKey=4ee1ab436a574a03ab1d88779932e6a6&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e011c616-328d-4bec-916a-72aa52a1cb04?apiKey=4ee1ab436a574a03ab1d88779932e6a6&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e011c616-328d-4bec-916a-72aa52a1cb04?apiKey=4ee1ab436a574a03ab1d88779932e6a6&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e011c616-328d-4bec-916a-72aa52a1cb04?apiKey=4ee1ab436a574a03ab1d88779932e6a6&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e011c616-328d-4bec-916a-72aa52a1cb04?apiKey=4ee1ab436a574a03ab1d88779932e6a6&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e011c616-328d-4bec-916a-72aa52a1cb04?apiKey=4ee1ab436a574a03ab1d88779932e6a6&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e011c616-328d-4bec-916a-72aa52a1cb04?apiKey=4ee1ab436a574a03ab1d88779932e6a6&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e011c616-328d-4bec-916a-72aa52a1cb04?apiKey=4ee1ab436a574a03ab1d88779932e6a6&"
            class="aspect-square w-10 max-w-full shrink-0 overflow-hidden object-contain object-center mix-blend-plus-lighter mr-2"
          />
          <div class="flex grow basis-[0%] flex-col items-stretch justify-center self-stretch">
            <div class="text-lg leading-6 text-violet-300">{data.content}</div>
          </div>
        </div>
      )}

      {/* <div class={`px-3 py-1.5 rounded-2xl w-fit
                ${data.from === "customer" ? 'self-end bg-[#2b5278] text-white ml-10' : 'self-start bg-[#abcdef] text-black mr-10'}`}>
                {data.content}
            </div> */}
    </>
  ) : (
    <audio
      controls
      src={data.content}
      class={`${
        data.sender === "customer" ? "self-end" : "self-start"
      } min-h-[50px] mt-3 mb-3`}
    >
      Your browser does not support the
      <code>audio</code> element.
    </audio>
  );
});
