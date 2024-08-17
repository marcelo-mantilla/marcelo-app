import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format, parse } from "date-fns";

export async function getPost(slug) {
    const filePath = path.join(process.cwd(), 'src/app/data/posts', `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContents);
    return { content, frontmatter };
}

export async function getAllPosts() {
    const postsDirectory = path.join(process.cwd(), 'src/app/data/posts');
    const filenames = fs.readdirSync(postsDirectory);

    const posts = filenames.map((filename) => {
        const slug = filename.replace(/\.mdx$/, '');
        const filePath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data: frontmatter } = matter(fileContents);
        return {
            slug,
            ...frontmatter,
        };
    });

    return posts;
}