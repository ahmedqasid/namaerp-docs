import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import Typesense from 'typesense';
import { fileURLToPath } from 'url';

// Support __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjust this to your docs folder
const DOCS_DIR = path.join(__dirname, '../docs');

const walkMdFiles = async (dir) => {
    let results = [];
    const list = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of list) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            const subResults = await walkMdFiles(fullPath);
            results = results.concat(subResults);
        } else if (entry.name.endsWith('.md')) {
            results.push(fullPath);
        }
    }
    return results;
};

const extractDocInfo = async (filePath) => {
    const content = await fs.readFile(filePath, 'utf-8');
    const { data, content: body } = matter(content);
    const relativePath = filePath
        .replace(DOCS_DIR, '')
        .replace(/\\/g, '/')
        .replace(/\.md$/, '.html');

    const titleFromBody = body
        .split('\n')
        .find((line) => line.startsWith('#'))
        ?.replace(/^#\s*/, '')
        .trim();

    return {
        id: filePath,
        title: data.title || titleFromBody || '',
        content: body,
        url: relativePath,
        slug: path.basename(filePath, '.md'),
    };
};

const indexDocs = async () => {
    const client = new Typesense.Client({
        nodes: [
            {
                host: 'localhost',
                port: 8108,
                protocol: 'http',
            },
        ],
        apiKey: 'xyz', // Replace with your real Typesense Admin API key
    });

    try {
        await client.collections('docs').delete();
    } catch {
        // Ignore if not found
    }

    await client.collections().create({
        name: 'docs',
        fields: [
            { name: 'title', type: 'string' },
            { name: 'content', type: 'string' },
            { name: 'url', type: 'string' },
            { name: 'slug', type: 'string' },
        ]
    });

    const files = await walkMdFiles(DOCS_DIR);
    const docs = await Promise.all(files.map(extractDocInfo));

    await client.collections('docs').documents().import(docs, { action: 'upsert' });

    console.log(`✅ Successfully indexed ${docs.length} documents.`);
};

indexDocs().catch((err) => {
    console.error('❌ Indexing failed:', err);
});
