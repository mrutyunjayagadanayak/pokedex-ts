import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
  if (args.length === 0) {
    throw new Error("No arguments provided");
  }
  const pokemonName = args[0];
  const result = await state.pokeAPI.fetchPokemon(pokemonName);

  const roll = Math.floor(Math.random() * result.base_experience);

  console.log(`Throwing a Pokeball at ${pokemonName}...`);
  if (roll > 50) {
    console.log(`${pokemonName} escaped!`);
  } else {
    console.log(`${pokemonName} was caught!`);
    state.pokedex[pokemonName] = result;
    console.log("You may now inspect it with the inspect command.")
  }
}
