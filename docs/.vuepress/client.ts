import {defineClientConfig} from '@vuepress/client'
import RTLBlock from "./components/RTLBlock.vue";
import LTRBlock from "./components/LTRBlock.vue";
import ServerBaseURL from "./components/ServerBaseURL.vue";
import UtilityLinkBuilder from "./components/UtilityLinkBuilder.vue";

export default defineClientConfig({
    enhance({app, router, siteData}) {
        app.component('RTLBlock', RTLBlock)
        app.component('rtl', RTLBlock)
        app.component('LTRBlock', LTRBlock)
        app.component('ltr', LTRBlock)
        app.component('ServerBaseURL', ServerBaseURL)
        app.component('UtilityLinkBuilder', UtilityLinkBuilder)
        router.afterEach((to) => {
            // console.log(to.meta._pageChunk.data.frontmatter.lang)
            if(typeof window === 'undefined')
                return;
            const isRtl = to.path.startsWith('/ar/') || to.meta._pageChunk?.data?.frontmatter?.lang === 'ar'
            document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr')
        })
    }
})
