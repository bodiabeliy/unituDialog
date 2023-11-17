import {$, component$ } from "@builder.io/qwik"
import "./index.css"

export default component$(() => {
    const iSActiveMenu = $(() => {    
        const menuBtn = document.querySelector('.menuActionsButtons__toggler');
        let isMenuOpen = false;
    
      menuBtn?.addEventListener('click', ()=>{
        isMenuOpen = !isMenuOpen;
        menuBtn.classList.toggle('is-active');
      })
    });
    
    return (
        <section class="menuActionButtons__wrapper">
            <div class="menuActionsButtons__toggler" onClick$={[iSActiveMenu]}>
                <i></i>
                <span>Click</span>
            </div>
            <div class="menuActionsButtons__content">
                <ul>
                    <li>
                        <label>
                            <input type="checkbox" />
                            <span></span>
                        </label>
                    </li>
                    <li></li>
                </ul>
            </div>
        </section>
    )
})