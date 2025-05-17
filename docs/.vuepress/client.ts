import { defineClientConfig } from '@vuepress/client'
import RTLBlock from "./components/RTLBlock.vue";

export default defineClientConfig({
    enhance({app, router, siteData}) {
        app.component('RTLBlock', RTLBlock)
        router.afterEach((to) => {
            // console.log(to.meta._pageChunk.data.frontmatter.lang)
            if(typeof window === 'undefined')
                return;
            const isRtl = to.path.startsWith('/ar/') || to.meta._pageChunk?.data?.frontmatter?.lang === 'ar'
            document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr')
        })
    }
})
