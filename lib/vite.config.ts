import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
/// <reference types="node" />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'SmartTableLib',
      formats: ['es', 'cjs'],
      fileName: (format: string) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-window',
        '@mui/material',
        '@mui/icons-material',
        '@emotion/react',
        '@emotion/styled',
        'material-react-table',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-window': 'ReactWindow',
          '@mui/material': 'MuiMaterial',
          '@mui/icons-material': 'MuiIcons',
          '@emotion/react': 'EmotionReact',
          '@emotion/styled': 'EmotionStyled',
          'material-react-table': 'MaterialReactTable',
        },
      },
    },
  },
});
