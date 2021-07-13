function slugify(str) {
  if (!str || typeof str !== 'string') {
    throw `Slugify expects a string, received ${typeof str}`;
  }
  return str
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-*|-*$/g, '')
    .toLowerCase();
}

export { slugify };
