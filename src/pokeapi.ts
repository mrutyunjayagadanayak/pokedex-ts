
import { Cache } from "./pokecache.js";
export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;
  constructor(interval: number = 180000) {
    this.#cache = new Cache(interval)
  }

  async #fetchData<T>(url: string): Promise<T> {
    const val = this.#cache.get<T>(url);
    if (val) {
      return val;
    }
    const result: T = await (await fetch(url)).json();
    this.#cache.add(url, result);
    return result;
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    let url: string

    if (pageURL) {
      url = pageURL;
    } else {
      url = `${PokeAPI.baseURL}/location-area/`;
    }
    return this.#fetchData<ShallowLocations>(url);
  }

  async fetchLocation(locationName: string): Promise<Location> {
    if (locationName.trim().length === 0) {
      throw new Error("No location name provioded");
    }

    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    return this.#fetchData<Location>(url);
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

    return this.#fetchData(url);
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

export type Pokemon = {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }[];
  }[];
  name: string;
  order: number;
  past_types: any[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: any;
    back_shiny: string;
    back_shiny_female: any;
    front_default: string;
    front_female: any;
    front_shiny: string;
    front_shiny_female: any;
    other: {
      dream_world: {
        front_default: string;
        front_female: any;
      };
      home: {
        front_default: string;
        front_female: any;
        front_shiny: string;
        front_shiny_female: any;
      };
      official_artwork: {
        front_default: string;
        front_shiny: string;
      };
    };
    versions: {
      [generation: string]: {
        [game: string]: {
          back_default: string;
          back_female?: any;
          back_shiny: string;
          back_shiny_female?: any;
          front_default: string;
          front_female?: any;
          front_shiny: string;
          front_shiny_female?: any;
        };
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
};
