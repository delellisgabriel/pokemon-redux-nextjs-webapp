export const types = {
  normal: "var(--normal-type)",
  fire: "var(--fire-type)",
  water: "var(--water-type)",
  electric: "var(--electric-type)",
  grass: "var(--grass-type)",
  ice: "var(--ice-type)",
  fighting: "var(--fighting-type)",
  poison: "var(--poison-type)",
  ground: "var(--ground-type)",
  flying: "var(--flying-type)",
  psychic: "var(--psychic-type)",
  bug: "var(--bug-type)",
  rock: "var(--rock-type)",
  ghost: "var(--ghost-type)",
  dragon: "var(--dragon-type)",
  dark: "var(--dark-type)",
  steel: "var(--steel-type)",
  fairy: "var(--fairy-type)",
};

export function generateSafeList(): string[] {
  const safeList: string[] = [];
  Object.entries(types).forEach(([type, _]) => safeList.push(`bg-${type}`));
  return safeList;
}
