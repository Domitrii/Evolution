import { api } from "../config/api";
import type { Favorite, Game } from "../types/api";

type GamesResponse = Game[] | { games: Game[] };

const isGamesArray = (data: unknown): data is Game[] => Array.isArray(data);

const isWrappedGames = (data: unknown): data is { games: Game[] } =>
  typeof data === "object" &&
  data !== null &&
  Array.isArray((data as { games: unknown }).games);

export const getGames = async (): Promise<Game[]> => {
  try {
    const response = await api.get<GamesResponse>("/games/games");
    const data = response.data;

    if (isGamesArray(data)) {
      return data;
    }

    if (isWrappedGames(data)) {
      return data.games;
    }

    console.error("Unexpected games response shape:", data);
    return [];
  } catch (error) {
    console.error("Failed to fetch games", error);
    return [];
  }
};

export const getGameById = async (id:number) => {
  try{
    const {data} = await api.get<GamesResponse>(`/games/game/${id}`)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}

export const addFavorite = async (gameId: number) => {
  try {
    const { data } = await api.post<Favorite>(`/games/favorites/${gameId}`);
    return data;
  } catch (error) {
    console.log(error);
    // console.error(error);
    return undefined;
  }
};

export const getFavorites = async (): Promise<Favorite[]> => {
  try {
    const { data } = await api.get<Favorite[]>("/games/favorites");
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const removeFavorite = async (id: string): Promise<void> => {
  try {
    await api.delete(`/games/favorites/${id}`);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}