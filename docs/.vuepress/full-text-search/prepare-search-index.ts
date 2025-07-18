import type {App as VuepressApp, Page as VuepressPage} from "@vuepress/core";
import type {PageContent, PageIndex, SearchIndices, SearchIndexConfig} from "./types";
import {Parser} from "htmlparser2";
import {normalizeArabic} from "./nama-specific-utils";

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__[UPD_NAME]) {
    __VUE_HMR_RUNTIME__[UPD_NAME](searchIndex)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ searchIndex }) => {
    if (__VUE_HMR_RUNTIME__[UPD_NAME]) {
      __VUE_HMR_RUNTIME__[UPD_NAME](searchIndex)
    }
  })
}
`;
export type App = Pick<VuepressApp, "env" | "writeTemp"> & {
  pages: Page[];
};
export type Page = Pick<
  VuepressPage,
  "pathLocale" | "title" | "path" | "headers" | "contentRendered"
>;

/** Prepare index resource script for search */
export async function prepareSearchIndex({
                                           app,
                                           config,
                                         }: {
  app: App;
  config?: SearchIndexConfig;
}): Promise<string> {
  // Default configuration
  const searchConfig = config || {
    searchIndexClassNames: [],
    defaultSearchIndex: 'default'
  };

  // generate multiple search indices
  const searchIndices: SearchIndices = {};
  
  // Always add a 'default' index and the configured indices (avoid duplicates)
  const allIndices = ['default', ...searchConfig.searchIndexClassNames.filter(name => name !== 'default')];
  // Initialize indices
  for (const indexName of allIndices) {
    searchIndices[indexName] = [];
  }

  for (const page of app.pages) {
    const pageIndices = extractPageContentsWithIndices(page, searchConfig.searchIndexClassNames);
    
    // Collect all contents for this page for the default index
    const allContents: PageContent[] = [];
    
    for (const [indexName, contents] of Object.entries(pageIndices)) {
      if (contents.length > 0) {
        // Add to specific index
        if (indexName !== 'default') {
          searchIndices[indexName].push({
            path: page.path,
            title: page.title,
            pathLocale: page.pathLocale,
            contents: contents,
          });
        }
        
        // Collect all contents for default index
        allContents.push(...contents);
      }
    }
    
    // Add all content to default index
    if (allContents.length > 0) {
      searchIndices['default'].push({
        path: page.path,
        title: page.title,
        pathLocale: page.pathLocale,
        contents: allContents,
      });
    }
  }

  // Create titles mapping with defaults
  const indexTitles = {
    'default': 'All Content',
    ...(searchConfig.searchIndexClassNames.filter(cn=>cn!=='default')).reduce((acc, className) => {
      acc[className] = searchConfig.searchIndexTitles?.[className] || className;
      return acc;
    }, {} as { [key: string]: string })
  };

  // search index file content
  let content = `
export const searchIndices = ${JSON.stringify(searchIndices, null, 2)};
export const searchIndexClassNames = ${JSON.stringify(['default', ...(searchConfig.searchIndexClassNames).filter(cn=>cn!==`default`)], null, 2)};
export const searchIndexTitles = ${JSON.stringify(indexTitles, null, 2)};
export const defaultSearchIndex = ${JSON.stringify('default', null, 2)};
export const defaultSelectedIndex = ${JSON.stringify(searchConfig.defaultSelectedIndex || 'default', null, 2)};
export const UPD_NAME = 'update-vuepress-plugin-full-text-search2-search-index';

// Legacy support
export const searchIndex = searchIndices['default'] || [];
`;

  // inject HMR code
  if (app.env.isDev) {
    content += HMR_CODE;
  }

  return app.writeTemp(
    "internal/vuepress-plugin-full-text-search2-search-index.js",
    content,
  );
}

/**
 * Extract contents with multiple indices based on class names
 */
function extractPageContentsWithIndices(page: Page, indexClassNames: string[]): { [indexName: string]: PageContent[] } {
  return extractPageContentsMultiIndex(page, indexClassNames);
}

/**
 * Extract contents for multiple search indices
 */
function extractPageContentsMultiIndex(page: Page, indexClassNames: string[]): { [indexName: string]: PageContent[] } {
  const results: { [indexName: string]: PageContent[] } = {};
  
  // Initialize results for default and configured indices
  results['default'] = [];
  for (const indexName of indexClassNames) {
    results[indexName] = [];
  }

  const slugs = new Map<string, string>();
  const headers = [...page.headers];
  while (headers.length) {
    const h = headers.shift()!;
    slugs.set(h.slug, h.title);
    headers.push(...h.children);
  }

  let ignoreElement = 0;
  let withinHeader = 0;
  let indexStack: string[] = ['default']; // stack to handle nested elements
  let currentIndex = 'default';
  let divDepthStack: number[] = [0]; // track div depth for each index level
  let currentDivDepth = 0;

  let scope: PageContent = {
    header: "",
    slug: "",
    content: "",
  };
  
  // Add initial scope to default index
  results['default'].push(scope);

  const parser = new Parser({
    ontext(text) {
      if (ignoreElement) {
        return;
      }
      const prop = withinHeader ? "header" : "content";
      scope[prop] += text;
    },
    onopentag(name, attribute) {
      if (
        ignoreElement ||
        name === "script" ||
        name === "style" ||
        (name === "div" && (attribute.class === "line-numbers" || attribute.class === "ignore-in-full-text-search"))
      ) {
        ignoreElement++;
        return;
      }

      // Track div depth for all divs
      if (name === "div") {
        currentDivDepth++;
        
        // Check if this div has one of our index class names
        if (attribute.class) {
          const classes = attribute.class.split(' ');
          for (const className of classes) {
            if (indexClassNames.includes(className)) {
              // Switch to the specific index
              currentIndex = className;
              indexStack.push(currentIndex);
              divDepthStack.push(currentDivDepth); // remember the depth where we entered this index
              
              // Create new scope for this index
              scope = {
                header: "",
                slug: "",
                content: "",
              };
              results[currentIndex].push(scope);
              return;
            }
          }
        }
      }

      if (withinHeader) {
        withinHeader++;
        return;
      }

      if (!/^h\d$/u.test(name)) {
        return;
      }
      
      const id = attribute.id;
      const title = slugs.get(id);
      if (title) {
        scope = {
          header: title,
          slug: id,
          content: "",
        };
        results[currentIndex].push(scope);
        ignoreElement++;
      } else {
        scope = {
          header: "",
          slug: id,
          content: "",
        };
        results[currentIndex].push(scope);
        withinHeader++;
      }
    },
    onclosetag(name) {
      if (ignoreElement) {
        ignoreElement--;
        return;
      }
      if (withinHeader) {
        withinHeader--;
        return;
      }

      // Handle div closing with depth tracking
      if (name === "div") {
        // Check if we're closing the div that started the current search index
        if (divDepthStack.length > 1 && currentDivDepth === divDepthStack[divDepthStack.length - 1]) {
          // We're exiting a search index div, go back to parent context
          indexStack.pop();
          divDepthStack.pop();
          currentIndex = indexStack[indexStack.length - 1];
          
          // Create new scope for the parent index
          scope = {
            header: "",
            slug: "",
            content: "",
          };
          results[currentIndex].push(scope);
        }
        
        currentDivDepth--;
      }
    },
  });
  parser.parseComplete(page.contentRendered);

  // Clean up and normalize each index
  const allIndices = ['default', ...indexClassNames];
  for (const indexName of allIndices) {
    if (results[indexName]) {
      results[indexName] = results[indexName]
        .map((p) => {
          p.header = p.header
            .replace(/\s{2,}/g, " ")
            .replace(/^#/g, "")
            .trim();
          p.header = normalizeArabic(p.header);
          p.content = p.content.replace(/\s{2,}/g, " ").trim();
          p.content = normalizeArabic(p.content);
          return p;
        })
        .filter((p) => p.content || p.header);
    }
  }

  return results;
}

/**
 * Extract contents (legacy function for backward compatibility)
 */
function extractPageContents(page: Page): PageContent[] {
  const results: PageContent[] = [];

  const slugs = new Map<string, string>();
  const headers = [...page.headers];
  while (headers.length) {
    const h = headers.shift()!;
    slugs.set(h.slug, h.title);

    headers.push(...h.children);
  }

  let ignoreElement = 0;
  let withinHeader = 0;

  let scope: PageContent = {
    header: "",
    slug: "",
    content: "",
  };
  results.push(scope);

  const parser = new Parser({
    ontext(text) {
      if (ignoreElement) {
        return;
      }
      const prop = withinHeader ? "header" : "content";
      scope[prop] += text;
    },
    onopentag(name, attribute) {
      if (
        ignoreElement ||
        name === "script" ||
        name === "style" ||
        (name === "div" && (attribute.class === "line-numbers" || attribute.class === "ignore-in-full-text-search"))
      ) {
        ignoreElement++;
        return;
      }
      if (withinHeader) {
        withinHeader++;
        return;
      }

      if (!/^h\d$/u.test(name)) {
        return;
      }
      const id = attribute.id;
      const title = slugs.get(id);
      if (title) {
        scope = {
          header: title,
          slug: id,
          content: "",
        };
        results.push(scope);
        ignoreElement++;
      } else {
        scope = {
          header: "",
          slug: id,
          content: "",
        };
        results.push(scope);
        withinHeader++;
      }
    },
    onclosetag() {
      if (ignoreElement) {
        ignoreElement--;
        return;
      }
      if (withinHeader) {
        withinHeader--;
      }
    },
  });
  parser.parseComplete(page.contentRendered);

  return results
    .map((p) => {
      p.header = p.header
        .replace(/\s{2,}/g, " ")
        .replace(/^#/g, "")
        .trim();
      p.header = normalizeArabic(p.header);
      p.content = p.content.replace(/\s{2,}/g, " ").trim();
      p.content = normalizeArabic(p.content);
      return p;
    })
    .filter((p) => p.content || p.header);
}
