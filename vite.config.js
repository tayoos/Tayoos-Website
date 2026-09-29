import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    resolve: {
        extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.webp', '.png', '.jpg', '.jpeg', '.svg'],
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (!id.includes('node_modules')) return;

                    if (id.includes('three') || id.includes('@react-three')) return 'three';
                    if (id.includes('@mui') || id.includes('@emotion')) return 'mui';
                    if (id.includes('framer-motion')) return 'framer';
                    if (id.includes('react-grid-layout') || id.includes('react-resizable')) return 'grid';
                    if (id.includes('react-router')) return 'router';
                    if (id.includes('/react-dom/') || id.includes('\\react-dom\\') || /[/\\]react[/\\]/.test(id)) return 'react';

                    return 'vendor';
                },
            },
        },
        chunkSizeWarningLimit: 2000,
    },
});
