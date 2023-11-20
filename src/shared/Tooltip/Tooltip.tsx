import { component$ } from "@builder.io/qwik";


interface TooltipProps {
    tooltipText:string
  }
export default component$<TooltipProps>(({tooltipText}) => {
    return (
      <div class="tooltip__wrapper">
        <span>
            {tooltipText}
        </span>
      </div>
    );
});