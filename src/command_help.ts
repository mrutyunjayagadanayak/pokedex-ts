import { State } from "./state.js";

export function commandHelp(state: State): void {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:");

  for (let [key, command] of Object.entries(state.commands)) {
    console.log(`${key}: ${command.description}`);
  }
}
