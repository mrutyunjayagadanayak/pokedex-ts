import { State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:");

  for (let [key, command] of Object.entries(state.commands)) {
    console.log(`${key}: ${command.description}`);
  }
}
