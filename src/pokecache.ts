export type CacheEntry<T> = {
  createdAt: number;
  val: T;
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number = 1000;
  constructor() { };

  add<T>(key:string, val: T) {
    this.#cache.set(key, {
      createdAt: Date.now(),
      val: val,
    });
  }
  get<T>(key: string): T | undefined {
    return this.#cache.get(key)?.val;
  }

  #reap() {
    for (let key of this.#cache.keys()) {
      let data = this.#cache.get(key);
      if (!data) {
        this.#cache.delete(key);
        continue;
      }

      if (data.createdAt > Date.now() - this.#interval) {
        this.#cache.delete(key);
      }
    }
  }
}
