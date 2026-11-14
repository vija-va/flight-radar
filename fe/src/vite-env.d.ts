interface ImportMetaEnv {
    readonly VITE_WS_URL: string | undefined;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
