import {component$} from "@builder.io/qwik";

interface LoaderProps {
    loadingText:string
  }
export default component$<LoaderProps>(({loadingText}) => {
    return (
      <div class="text-white">
       
        <div class={'animate-spin w-[20px] h-[20px] rounded-full border-4 border-indigo-800 border-b-transparent'}>
           
        </div>
        <div class="">
        {loadingText}
        </div>
      </div>
    );
});
