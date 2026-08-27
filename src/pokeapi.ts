
export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    let url: string
    if (pageURL) {
      url = `${pageURL}/location-area/`;
    } else {
      url = `${PokeAPI.baseURL}/location-area/`;
    }
    const result = await fetch(url);
    return await result.json();
  }

  async fetchLocation(locationName: string): Promise<Location> {
    // implement this
  }
}

export type ShallowLocations = {
  // add properties here
};

export type Location = {
  // add properties here
};
