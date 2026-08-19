import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

describe("TMDB data boundary", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("returns fixture data without a key when mock mode is enabled", async () => {
    vi.stubEnv("TMDB_USE_MOCKS", "true");
    const { getHomeMovies } = await import("./tmdb");
    const home = await getHomeMovies();
    expect(home.trending[0]).toMatchObject({ id: 550, title: "Fight Club" });
  });

  it("fails clearly when the server key is missing", async () => {
    vi.stubEnv("TMDB_USE_MOCKS", "false");
    vi.stubEnv("TMDB_API_KEY", "");
    const { getHomeMovies, MissingTmdbKeyError } = await import("./tmdb");
    await expect(getHomeMovies()).rejects.toBeInstanceOf(MissingTmdbKeyError);
  });

  it("sends the key only from the server request", async () => {
    vi.stubEnv("TMDB_USE_MOCKS", "false");
    vi.stubEnv("TMDB_API_KEY", "test-key");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ results: [] }) });
    vi.stubGlobal("fetch", fetchMock);
    const { getHomeMovies } = await import("./tmdb");
    await getHomeMovies();
    const calledUrls = fetchMock.mock.calls.map(([url]) => String(url));
    expect(calledUrls).toHaveLength(2);
    expect(calledUrls.every((url) => url.includes("api_key=test-key"))).toBe(true);
  });
});
