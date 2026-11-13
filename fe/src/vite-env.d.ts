interface ImportMetaEnv {
    readonly VITE_WS_URL: string | undefined;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
