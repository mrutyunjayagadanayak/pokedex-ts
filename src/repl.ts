import readline from "readline";
import { getCommand } from "./command.js";

export function cleanInput(val: string): string[] {
  if (val.trim().length === 0) {
    return [];
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
    let data = cleanInput(input);
    if (data.length === 0) {
      rl.prompt();
      return;
    }
    const userCommand = data[0];
    const commands = getCommand();

    const command = commands[userCommand]
    if (command) {
      command.callback(commands);
    } else {
      console.log("Unknown command");
    }

    rl.prompt();
  })
}
