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
                    if (id.includes('node_modules')) {
                        return 'vendor'; // Moves dependencies to a separate file
                    }
                },
            },
        },
        chunkSizeWarningLimit: 1000, // Increases the warning limit to 1000 kB
    },
});
