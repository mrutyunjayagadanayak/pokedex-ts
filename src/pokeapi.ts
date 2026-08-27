
export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    let url: string
    if (pageURL) {
      url = pageURL;
    } else {
      url = `${PokeAPI.baseURL}/location-area/`;
    }
    const result = await fetch(url);
    return await result.json();
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
