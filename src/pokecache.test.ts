import { describe, expect, test } from "vitest";
import { Cache } from "./pokecache.js";

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500,
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000, // 1 second
  },
])("Test caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval * 3));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});


// TODO add more tests

describe.each([
  {
    input1: {
      key: "https://example.com",
      val: "testdata1",
      interval: 10,
    },
    input2: {
      key: "https://example.com",
      val: "testdata2",
      interval: 10,
    },
    expected: {
      key: "https://google.com",
      val: "testdata2",
      interval: 10,
    }
  },
  {
    input1: {
      key: "https://google.com",
      val: "testdata1",
      interval: 10,
    },
    input2: {
      key: "https://google.com",
      val: "testdata2",
      interval: 10,
    },
    expected: {
      key: "https://google.com",
      val: "testdata2",
      interval: 10,
    }
  },
])("Test caching ms", ({ input1, input2, expected }) => {

  test(`Expected: ${expected.val}`),() => {
    const cache = new Cache(input1.interval);

    cache.add(input1.key, input1.val);
    cache.add(input2.key, input2.val);

    const cached = cache.get(input2.key);

    expect(cached).toBe(expected.val);
  }
})
