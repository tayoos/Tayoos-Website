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
                // Single vendor chunk for all node_modules. Splitting React
                // consumers (react-grid-layout, framer-motion, mui, router)
                // into their own chunks broke cross-chunk React interop —
                // Rollup's CJS→ESM wrapper leaves `exports` undefined at the
                // wrong moment, producing errors like:
                //   "Cannot set properties of undefined (setting 'Children')"
                //   "Cannot read properties of undefined (reading 'forwardRef')"
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                },
            },
        },
        chunkSizeWarningLimit: 2000,
    },
});
