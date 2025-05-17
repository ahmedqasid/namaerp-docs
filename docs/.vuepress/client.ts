import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
    enhance({app, router, siteData}) {
        router.afterEach((to) => {
            // console.log(to.meta._pageChunk.data.frontmatter.lang)
            if(typeof window === 'undefined')
                return;
            const isRtl = to.path.startsWith('/ar/') || to.meta._pageChunk?.data?.frontmatter?.lang === 'ar'
            document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr')
        })
    }
})
