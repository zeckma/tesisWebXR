import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig } from "vite";

export default defineConfig({
    assetsInclude: ["**/*.gltf"],
    base: "/webxr/",
    publicDir: "static/",
    server: {
        host: true,
    },
    plugins: [basicSsl()],
});

// export default defineConfig({
//     publicDir: "Login/",
//     server: {
//         host: true,
//     },
//     plugins: [basicSsl()],
// });
