// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair -- ignore
/* eslint-disable @typescript-eslint/no-floating-promises -- ignore */
import type { App, LocaleConfig, PluginObject } from "@vuepress/core";
import { path } from "@vuepress/utils";
import { fileURLToPath } from "url";
import { prepareSearchIndex } from "./prepare-search-index";
import * as chokidar from "chokidar";

const dirname = path.dirname(__filename);
export interface FullTextSearchPluginOptions {
  /**
   * Locales config for search box
   */
  locales?: LocaleConfig<{
    placeholder: string;
  }>;
  /**
   * List of CSS class names to create separate search indices for
   */
  searchIndexClassNames?: string[];
  /**
   * Default search index to use
   */
  defaultSearchIndex?: string;
  /**
   * Default selected index in the dropdown
   */
  defaultSelectedIndex?: string;
  /**
   * Display titles for search indices
   */
  searchIndexTitles?: { [className: string]: string };
}

export const fullTextSearchPlugin = fullTextSearchPluginFunction;

export default fullTextSearchPlugin;

/** init plugin */
function fullTextSearchPluginFunction(
  options: FullTextSearchPluginOptions | App = {},
): PluginObject {
  return {
    name: "vuepress-plugin-full-text-search2",

    define: {
      __SEARCH_LOCALES__: ("locales" in options ? options?.locales : {}) ?? {},
    },

    clientConfigFile: path.resolve(dirname, "./client/clientConfig.ts"),

    // @ts-expect-error -- Backward compatibility for vuepress@<=2.0.0-beta.43
    clientAppEnhanceFiles: path.resolve(
      dirname,
      "./client/clientAppEnhance.ts",
    ),

    onPrepared(app) {
      const config = {
        searchIndexClassNames: (options as FullTextSearchPluginOptions).searchIndexClassNames || ['default'],
        defaultSearchIndex: (options as FullTextSearchPluginOptions).defaultSearchIndex,
        defaultSelectedIndex: (options as FullTextSearchPluginOptions).defaultSelectedIndex,
        searchIndexTitles: (options as FullTextSearchPluginOptions).searchIndexTitles || {}
      };
      prepareSearchIndex({ app, config });
    },

    onWatched: (app, watchers) => {
      const searchIndexWatcher = chokidar.watch("internal/pageData/*", {
        cwd: app.dir.temp(),
        ignoreInitial: true,
      });
      const config = {
        searchIndexClassNames: (options as FullTextSearchPluginOptions).searchIndexClassNames || ['default'],
        defaultSearchIndex: (options as FullTextSearchPluginOptions).defaultSearchIndex,
        defaultSelectedIndex: (options as FullTextSearchPluginOptions).defaultSelectedIndex,
        searchIndexTitles: (options as FullTextSearchPluginOptions).searchIndexTitles || {}
      };
      searchIndexWatcher.on("add", () => {
        prepareSearchIndex({ app, config });
      });
      searchIndexWatcher.on("change", () => {
        prepareSearchIndex({ app, config });
      });
      searchIndexWatcher.on("unlink", () => {
        prepareSearchIndex({ app, config });
      });
      watchers.push(searchIndexWatcher);
    },
  };
}
