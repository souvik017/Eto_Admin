// / <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACKEND_URI: string; // Add other environment variables here as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  