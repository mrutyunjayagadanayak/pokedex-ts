
export function cleanInput(val: string): string[] {
  if (val.length === 0) {
    return [""];
  }
  return val.toLowerCase().trim().split(/[ ,]+/);
}
