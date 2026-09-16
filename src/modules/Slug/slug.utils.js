export const slugify = (s = "") =>
  s
    .toString()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const doctorSlugBase = (d) =>
  slugify(`${d.firstName} ${d.lastName}`);

export const serviceSlugBase = (s) => slugify(s.name);