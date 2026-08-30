import { State } from "./state.js";

export async function commandPokeDex(state: State): Promise<void> {
  console.log("Your Pokedex:")
  for (let pokemon in state.pokedex) {
    console.log(` - ${pokemon}`);
  }
}
