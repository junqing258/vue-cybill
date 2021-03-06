import { resolve } from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'
import Pages from 'vite-plugin-pages'
import { createVuePlugin } from 'vite-plugin-vue2'
import ScriptSetup from 'unplugin-vue2-script-setup/vite'
import Inspect from 'vite-plugin-inspect'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'
import Components from 'unplugin-vue-components/vite'
import { ElementUiResolver } from 'unplugin-vue-components/resolvers'
import WindiCSS from 'vite-plugin-windicss'

const rollupOptions = {}

const alias = [
  { find: /^~/, replacement: '' },
  { find: 'vue', replacement: 'vue/dist/vue.esm' },
  {
    find: '@',
    replacement: resolve(__dirname, 'src'),
  },
]

const proxy = {}

const define = {
  'process.env.NODE_ENV': '"development"',
  'process.env.SITE_NAME': '"同程用车-Momentum"',
}

const esbuild = {}

// @see https://cn.vitejs.dev/config/
export default defineConfig({
  base: './', // index.html文件所在位置
  root: './', // js导入的资源路径
  publicDir: 'static',
  resolve: {
    alias,
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.styl'],
    dedupe: ['vue-demi'],
  },
  define: define,
  server: {
    // 代理
    proxy,
    https: {
      key: fs.readFileSync('./scripts/rsa/localhost-key.pem'),
      cert: fs.readFileSync('./scripts/rsa/localhost.pem'),
    },
    port: 3003,
    fs: {
      strict: false,
    },
  },
  build: {
    target: 'es2015',
    minify: 'terser', // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
    manifest: false, // 是否产出maifest.json
    sourcemap: false, // 是否产出soucemap.json
    outDir: 'build', // 产出目录
    rollupOptions,
  },
  esbuild,
  plugins: [
    createVuePlugin({
      jsx: true,
      vueTemplateOptions: {
        compilerOptions: {
          whitespace: 'condense',
        },
      },
    }),
    PkgConfig(),
    OptimizationPersist(),
    Components({
      dirs: ['src/components'],
      resolvers: [ElementUiResolver()],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
      dts: true,
    }),
    Inspect(),
    ScriptSetup(),
    Layouts({
      layoutsDir: 'src/layouts',
    }),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      pagesDir: [{ dir: 'src/pages', baseRoute: '' }],
      exclude: ['**/components/**.vue'],
      extensions: ['vue'],
      syncIndex: false,
      replaceSquareBrackets: true,
      nuxtStyle: true,
    }),
    WindiCSS(),
  ],
  css: {
    preprocessorOptions: {},
  },
})
