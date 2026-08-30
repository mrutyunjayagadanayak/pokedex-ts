import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
  if (args.length === 0) {
    throw new Error("No arguments provided");
  }
  const pokemonName = args[0];
  const pokemon = state.pokedex[pokemonName];

  if (!pokemon) {
    console.log("you have not caught that pokemon");
    return;
  }
  console.log(`Name: ${pokemonName}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Height: ${pokemon.weight}`);
  console.log("Stats:");

  for (let stats of pokemon.stats) {
    console.log(` -${stats.stat.name}: ${stats.base_stat}`);
  }

  console.log("Types:")
  for (let type of pokemon.types) {
    console.log(` -${type.type.name}`);
  }

}
