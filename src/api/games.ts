import { api } from "../config/api";
import type { Game } from "../types/api";

export const getGames = async (): Promise<Game[]> => {
    const response = await api.get<Game[]>("/games/games");
    return response.data;
}
