
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

  async fetchLocation(locationName: string): Promise<Location> {
    if (locationName.trim().length === 0) {
      throw new Error("No location name provioded");
    }

    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const val = this.#cache.get<Location>(url);

    if (val) {
      return val;
    }
    const result = await (await fetch(url)).json();
    this.#cache.add(url, result);
    return result;
  }
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


export type Location = {
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};
