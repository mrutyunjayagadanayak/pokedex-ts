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

  rl.on("line", async (input) => {
    let data = cleanInput(input);
    if (data.length === 0) {
      rl.prompt();
      return;
    }
    const userCommand = data[0];
    const commands = state.commands;

    const command = commands[userCommand]
    if (command) {
      try {
        await command.callback(state);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`An Error occured: ${error.message}`);
        }
      }

    } else {
      console.log("Unknown command");
    }

    rl.prompt();
  })
}
