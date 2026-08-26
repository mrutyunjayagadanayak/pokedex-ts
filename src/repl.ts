import readline from "readline";
import { State } from "./state.js";

export function cleanInput(val: string): string[] {
  if (val.trim().length === 0) {
    return [];
  }
  return val.toLowerCase().trim().split(/[ ,]+/);
}

export function startREPL(state: State): void {
  const rl = state.readline;

  rl.prompt();

  rl.on("line", (input) => {
    let data = cleanInput(input);
    if (data.length === 0) {
      rl.prompt();
      return;
    }
    const userCommand = data[0];
    const commands = state.commands;

    const command = commands[userCommand]
    if (command) {
      command.callback(state);
    } else {
      console.log("Unknown command");
    }

    rl.prompt();
  })
}
