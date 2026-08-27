import { State } from "./state.js";
import { ShallowLocations } from "./pokeapi.js";

export async function commandMapB(state: State): Promise<void> {
  const url = state.prevLocationsURL;

  if (!url) {
    console.log("No previous location to see.");
    return;
  }

  const data: ShallowLocations = await state.pokeAPI.fetchLocations(url);
  state.nextLocationsURL = data.next;
  state.prevLocationsURL = data.previous;

  for (let result of data.results) {
    console.log(`${result.name}`);
  }
}
