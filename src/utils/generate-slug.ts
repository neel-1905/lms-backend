export function generateSlug(name: string) {
  return name.toLowerCase().trim().replace(/\s+/g, "-");
}
