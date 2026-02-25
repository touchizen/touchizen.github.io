import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { Language } from './i18n';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  author: string;
  content: string;
  htmlContent: string;
}

const contentDir = path.join(process.cwd(), 'content', 'blog');

export function getPostSlugs(lang: Language): string[] {
  const langDir = path.join(contentDir, lang);
  if (!fs.existsSync(langDir)) return [];
  return fs.readdirSync(langDir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''));
}

export function getPostBySlug(lang: Language, slug: string): BlogPost | null {
  const filePath = path.join(contentDir, lang, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const htmlContent = marked(content) as string;

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    excerpt: data.excerpt || '',
    tags: data.tags || [],
    author: data.author || 'Touchizen',
    content,
    htmlContent,
  };
}

export function getAllPosts(lang: Language): BlogPost[] {
  const slugs = getPostSlugs(lang);
  return slugs
    .map(slug => getPostBySlug(lang, slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
