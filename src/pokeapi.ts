
import { Cache } from "./pokecache.js";
export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;
  constructor(interval: number = 180000) {
    this.#cache = new Cache(interval)
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    let url: string

    if (pageURL) {
      url = pageURL;
    } else {
      url = `${PokeAPI.baseURL}/location-area/`;
    }

    const val = this.#cache.get<ShallowLocations>(url);
    if (val) {
      return val;
    }
    const result = await (await fetch(url)).json();
    this.#cache.add(url, result);
    return result
  }
  //TODO
  //async fetchLocation(locationName: string): Promise<Location> {
    // implement this
    //}
}

export type ShallowLocations = {
  count: number,
  next: string | null,
  previous: string | null,
  results: {
    name: string,
    url: string,
    }[],
};

//TODO
//export type Location = {
  // add properties here
//};
