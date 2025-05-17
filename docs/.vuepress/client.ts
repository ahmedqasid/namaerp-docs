import {defineClientConfig} from '@vuepress/client'
import RTLBlock from "./components/RTLBlock.vue";
import LTRBlock from "./components/LTRBlock.vue";

export default defineClientConfig({
    enhance({app, router, siteData}) {
        app.component('RTLBlock', RTLBlock)
        app.component('rtl', RTLBlock)
        app.component('LTRBlock', LTRBlock)
        app.component('ltr', LTRBlock)
        router.afterEach((to) => {
            // console.log(to.meta._pageChunk.data.frontmatter.lang)
            if(typeof window === 'undefined')
                return;
            const isRtl = to.path.startsWith('/ar/') || to.meta._pageChunk?.data?.frontmatter?.lang === 'ar'
            document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr')
        })
    }
})
