import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
  if (args.length === 0) {
    throw new Error("No arguments provided");
  }
  const location = args[0]
  const results = await state.pokeAPI.fetchLocation(location);

  console.log(`Exploring ${location}...`)
  console.log("Found Pokemon:")
  for (let val of results.pokemon_encounters) {
    console.log(`-  ${val.pokemon.name}`);
  }
}
