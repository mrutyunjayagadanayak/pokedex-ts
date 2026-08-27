import { State } from "./state.js";
import { ShallowLocations } from "./pokeapi.js";

export async function commandMap(state: State): Promise<void> {
  let data: ShallowLocations;
  if (state.nextLocationsURL) {
     data = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
  } else {
     data = await state.pokeAPI.fetchLocations();
  }

  state.nextLocationsURL = data.next;
  state.prevLocationsURL = data.previous;

  for (let result of data.results) {
    console.log(`${result.name}`);
  }
}
