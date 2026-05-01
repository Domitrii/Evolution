export interface Game {
    _id: number;
    title: string;
    thumbnail: string;
    short_description: string;
    genre: string;
    platform: string;
    publisher: string;
    release_date: string;
    price: number;
    isFavorite: boolean;
}

export interface RegisterRequest{
    name?:string,
    email: string,
    password: string,
    repeatPassword: string
}

export interface User {
  id: string
  name: string
  email: string
}

export interface RegisterResponse {
  user: User,
  token: string,
  refreshToken: string
}

export interface LogInRequest{
    email: string,
    password: string
}

export interface Favorite {
  _id: object | string;
  gameId: number | Game;
  userId: string;
}

export interface BasketItem {
  game: Game
}

export interface Basket {
  games: Game[];
  userId: string;
}

// export interface PurchaseResponse {
//   game: 
// }
