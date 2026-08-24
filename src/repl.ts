import readline from "readline";

export function cleanInput(val: string): string[] {
  if (val.length === 0) {
    return [""];
  }
  return val.toLowerCase().trim().split(/[ ,]+/);
}

export function startREPL(): void {
  const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout,
    prompt:"Pokedex > "
  });

  rl.prompt();

  rl.on("line", (input) => {
    if (!input) {
      rl.prompt();
    }
    let data = cleanInput(input);
    if (data.length === 0) {
      rl.prompt();
    }
    console.log(`Your command was: ${data[0]}`);
    rl.prompt();
  })
}
