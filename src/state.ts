import { createInterface, Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
}

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>
}

function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Display the names of 20 location areas",
      callback: commandMap,
    }
  }
}


export function initState(): State {

  const readline = createInterface({
    input: process.stdin,
    output:process.stdout,
    prompt:"Pokedex > "
  });

  const commands = getCommands()

  return {readline, commands}
}
