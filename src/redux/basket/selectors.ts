import type { RootState } from "../store"

export const selectBasketItems = (state: RootState) => state.basket.items
export const selectBasketIds = (state: RootState) => state.basket.items.map(i => i.id)
export const selectIsInBasket = (id: string) => (state: RootState) =>
  state.basket.items.some(item => item.id === id)