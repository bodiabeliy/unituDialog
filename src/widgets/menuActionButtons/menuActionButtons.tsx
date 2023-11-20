import { $, component$, useSignal } from "@builder.io/qwik";

import "./index.css";

export default component$(() => {
  const isMicrophoneAnabled = useSignal(false);

  const iSActiveMenu = $(() => {
    const menuBtn = document.querySelector(".menuActionsButtons__toggler");
    let isMenuOpen = false;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      isMenuOpen = !isMenuOpen;
      menuBtn?.classList.toggle("is-active");
  });

  const inputHandler = $((event: any) => {
    isMicrophoneAnabled.value = event.target.checked;
  });

  return (
    <section class="menuActionButtons__wrapper">
      <div class="menuActionsButtons__toggler" onClick$={[iSActiveMenu]}>
        <i></i>
        <span>
          Click
        </span>
      </div>
      <div class="menuActionsButtons__content">
        <ul>
          <li>
            <div class="menuActionsButtons__soundSwitch">
              <input
                onInput$={inputHandler}
                class="menuActionsButtons__input"
                type="checkbox"
              />
              <span class="menuActionsButtons__switcher">
              {isMicrophoneAnabled.value == true ? (
                  <svg
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Volume-notice (&#229;&#163;&#176;&#233;&#159;&#179;-&#229;&#164;&#167;)">
                      <path
                        id="Vector"
                        d="M11.4997 2.75V19.25C8.29134 19.25 5.90732 15.0513 5.90732 15.0513H3.24967C2.74341 15.0513 2.33301 14.6409 2.33301 14.1346V7.79662C2.33301 7.29034 2.74341 6.87995 3.24967 6.87995H5.90732C5.90732 6.87995 8.29134 2.75 11.4997 2.75Z"
                        fill="#9463FE"
                        stroke="#9463FE"
                        stroke-linejoin="round"
                      />
                      <path
                        id="Vector_2"
                        d="M15.167 6.875C15.4526 7.13006 15.7115 7.4157 15.9389 7.72695C16.6056 8.63977 17.0003 9.77272 17.0003 11C17.0003 12.2166 16.6123 13.3406 15.9562 14.2493C15.7247 14.5697 15.4599 14.8634 15.167 15.125"
                        stroke="#9463FE"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        id="Vector_3"
                        d="M16.1914 18.8768C18.8716 17.277 20.6666 14.3481 20.6666 11C20.6666 7.70389 18.9269 4.8141 16.3157 3.19873"
                        stroke="#9463FE"
                        stroke-linecap="round"
                      />
                    </g>
                  </svg>
                ) : (
                  <svg
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Volume-notice (&#229;&#163;&#176;&#233;&#159;&#179;-&#229;&#164;&#167;)">
                      <path
                        id="Vector"
                        d="M11.4997 2.75V19.25C8.29134 19.25 5.90732 15.0513 5.90732 15.0513H3.24967C2.74341 15.0513 2.33301 14.6409 2.33301 14.1346V7.79662C2.33301 7.29034 2.74341 6.87995 3.24967 6.87995H5.90732C5.90732 6.87995 8.29134 2.75 11.4997 2.75Z"
                        fill="#474747"
                        stroke="#474747"
                        stroke-linejoin="round"
                      />
                      <path
                        id="Line 173"
                        d="M14.5 8L19.5 15"
                        stroke="#474747"
                        stroke-linecap="round"
                      />
                      <path
                        id="Line 174"
                        d="M19.5 8L14.5 15"
                        stroke="#474747"
                        stroke-linecap="round"
                      />
                    </g>
                  </svg>
                )}
              </span>
              
            </div>
          </li>
        </ul>
        
      </div>
    </section>
  );
});
