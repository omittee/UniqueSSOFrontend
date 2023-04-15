import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver({ importStyle: "less" })],
    })
  ],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@views': '/src/views',
      '@router': '/src/router',
      '@style': '/assets/style'
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          '@primary-color': '#3564DD',
        },
        javascriptEnabled: true,
        // charset: false,
        additionalData: '@import "./src/assets/style/global.less";',
      },
    },
  }

})
