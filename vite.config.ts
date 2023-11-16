import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    build: {
      minify: true,
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=15768000",
      },
    },

      server: {
          hmr: {
              protocol: 'ws',
              host: 'localhost',
              port: 40956

          },
      }
     /* server: {
          hmr: {
              host: 'testai.uwp.digital',

              protocol: 'ws'
          }

  }*/
  };
});
