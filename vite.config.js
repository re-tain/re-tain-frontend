import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import inject from "@rollup/plugin-inject";
import rollupNodePolyFill from "rollup-plugin-polyfill-node";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/",
    plugins: [react()],
    resolve: {
        alias: {
            stream: "stream-browserify",
            os: "os-browserify/browser",
            util: "util",
            process: "process/browser",
            buffer: "buffer",
        },
    },
    esbuild: {
        loader: "jsx",
    },
    build: {
        commonjsOptions: {
            transformMixedEsModules: true,
        },
        //https://stackoverflow.com/questions/70714690/buffer-is-not-defined-in-react-vite
        rollupOptions: {
            plugins: [rollupNodePolyFill()],
        },
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                ".js": "jsx",
            },
            define: {
                global: "globalThis",
            },
            // Enable esbuild polyfill plugins
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    buffer: true,
                }),
            ],
        },
    },
});
