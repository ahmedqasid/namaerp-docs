
import { defineAsyncComponent } from "vue";
import {defineClientConfig} from "@vuepress/client";

export default defineClientConfig({
  enhance({ app }) {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- component
    const SearchBox = defineAsyncComponent(() => import("./SearchBox.vue"));
    const EmbeddableSearchBox = defineAsyncComponent(() => import("./EmbeddableSearchBox.vue"));
    app.component("SearchBox", SearchBox);
    app.component("EmbeddableSearchBox", EmbeddableSearchBox);
  },
});
