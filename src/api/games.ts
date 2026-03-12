import { api } from "../config/api";
import type { Favorite, Game } from "../types/api";

export const getGames = async (): Promise<Game[]> => {
    const response = await api.get<Game[]>("/games/games");
    return response.data;
}

export const addFavorite = async (gameId:number) => {
    try{
        const {data} = await api.post<Favorite>(`/games/favorites/${gameId}`)
        return data
    } catch (error) {
        console.log(error)
        console.error(error)
        return undefined
    }
}

export const getFavorites = async (): Promise<Favorite[]> => {
    try {
        const {data} = await api.get<Favorite[]>("/games/favorites")
        return data
    } catch (error) {
        console.error(error)
        return []
    }
}

export const removeFavorite = async (id:string): Promise<void> => {
    try {
        await api.delete(`/games/favorites/${id}`)
    } catch (error) {
        console.error(error)
        return undefined
    }
}