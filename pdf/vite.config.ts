import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './pdfmaketemplate.ts',
      name: 'MrtPdfMakeReports',
      fileName: 'mrt-pdfmake-reports'
    },
    rollupOptions: {
      external: ['pdfmake', 'pdfmake/build/vfs_fonts'],
      output: {
        globals: {
          pdfmake: 'pdfMake',
          'pdfmake/build/vfs_fonts': 'pdfFonts'
        }
      }
    }
  },
  esbuild: {
    jsx: 'transform', 
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
}); 