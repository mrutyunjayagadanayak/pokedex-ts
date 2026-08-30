import { createInterface, Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { commandMapB } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokeDex } from "./command_pokedex.js";

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
  pokedex: Record<string, Pokemon>;
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
    },
    catch: {
      name: "catch",
      description: "Catch a pokemon",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Inspect a caught pokemon",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "See all the caught pokemon",
      callback: commandPokeDex,
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
  const pokedex = {};

  return { readline, commands, pokeAPI, nextLocationsURL, prevLocationsURL, pokedex};
}
