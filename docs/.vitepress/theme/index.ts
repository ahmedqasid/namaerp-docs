import {h} from 'vue'
import DefaultTheme from 'vitepress/theme'
import type {Theme} from 'vitepress'
import './custom.css'
import AiSearchNavButton from './components/AiSearchNavButton.vue'
import LocaleToggleLink from './components/LocaleToggleLink.vue'

import RTLBlock from './components/RTLBlock.vue'
import LTRBlock from './components/LTRBlock.vue'
import ServerBaseURL from './components/ServerBaseURL.vue'
import UtilityLinkBuilder from './components/UtilityLinkBuilder.vue'
import NamaURL from './components/NamaURL.vue'
import NamaOptionURL from './components/NamaOptionURL.vue'
import GlobalConfigOption from './components/GlobalConfigOption.vue'
import HRConfigOption from './components/HRConfigOption.vue'
import LinkToNewRecord from './components/LinkToNewRecord.vue'
import SupplyChainOption from './components/SupplyChainOption.vue'
import CopyIcon from './components/CopyIcon.vue'
import EmbeddableSearchBox from './components/EmbeddableSearchBox.vue'

export default {
    extends: DefaultTheme,
    // Adds the AI/advanced search button next to the built-in (minisearch) navbar search,
    // and a direct ar/en toggle link (the default translations dropdown is hidden in custom.css)
    Layout: () => h(DefaultTheme.Layout, null, {
        'nav-bar-content-before': () => h(AiSearchNavButton),
        'nav-bar-content-after': () => h(LocaleToggleLink)
    }),
    enhanceApp({app}) {
        app.component('RTLBlock', RTLBlock)
        app.component('rtl', RTLBlock)
        app.component('LTRBlock', LTRBlock)
        app.component('ltr', LTRBlock)
        app.component('ServerBaseURL', ServerBaseURL)
        app.component('UtilityLinkBuilder', UtilityLinkBuilder)
        app.component('NamaURL', NamaURL)
        app.component('NamaOptionURL', NamaOptionURL)
        app.component('GlobalConfigOption', GlobalConfigOption)
        app.component('HRConfigOption', HRConfigOption)
        app.component('LinkToNewRecord', LinkToNewRecord)
        app.component('SupplyChainOption', SupplyChainOption)
        app.component('CopyIcon', CopyIcon)
        app.component('EmbeddableSearchBox', EmbeddableSearchBox)
    }
} satisfies Theme
