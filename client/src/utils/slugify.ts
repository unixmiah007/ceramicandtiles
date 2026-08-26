export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function imagePath(...segments: string[]): string {
  return `/images/${segments.map(slugify).join('/')}.jpg`;
}
