import { createInterface, Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMapB } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
}

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
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
    },
    mapb: {
      name: "mapb",
      description: "Display the name of 20 previous areas",
      callback: commandMapB,
    },
    explore: {
      name: "explore",
      description: "Explore an area",
      callback: commandExplore,
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

  const pokeAPI = new PokeAPI();
  const nextLocationsURL: string = "";
  const prevLocationsURL: string = "";

  return { readline, commands, pokeAPI, nextLocationsURL, prevLocationsURL};
}
