import {component$} from "@builder.io/qwik";
import type {Messages} from "~/routes";

interface BLockProps {
    data: Messages;
}

export default component$<BLockProps>(({data}) => {
    return (
        !data.audio
            ?
            <div class={`px-3 py-1.5 rounded-2xl w-fit
                ${data.from === "customer" ? 'self-end bg-[#2b5278] text-white ml-10' : 'self-start bg-[#abcdef] text-black mr-10'}`}>
                {data.content}
            </div>
            :
            <audio
                controls
                src={data.content}
                class={`${data.from === "customer" ? 'self-end' : "self-start"} min-h-[50px]`}
            >
                Your browser does not support the
                <code>audio</code> element.
            </audio>
    );
});
