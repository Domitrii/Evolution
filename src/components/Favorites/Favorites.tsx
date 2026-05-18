import { useEffect } from "react"
import { useAuth } from "../AuthContext/useAuth"
import { CircularProgressbar } from "react-circular-progressbar"
import s from "./Favorites.module.scss"
import { NavLink } from "react-router-dom"
import { FaRegHeart } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { selectFavorites, selectFavoritesLoading } from "../../redux/favorites/selectors"
import type { AppDispatch } from "../../redux/store"
import { apiGetFavorites, apiRemoveFavorites } from "../../redux/favorites/favoritesThunc"

function Favorites() {
  const {token} = useAuth()
  const dispatch = useDispatch<AppDispatch>()
  const favorites = useSelector(selectFavorites)
  const isLoading = useSelector(selectFavoritesLoading)

  useEffect(() => {
    if(!token) return
    dispatch(apiGetFavorites())
  }, [dispatch, token])

  const handleRemoveFavorite = async (gameId:string) => {
    dispatch(apiRemoveFavorites(gameId))
  }


  if (!token) {
      return (
        <div className={s.favoriteCont}>
          <div className={s.accountMsg}>
            You should have an <NavLink to="/signup">account</NavLink> to have favorite games
          </div>
        </div>
      )
    }

  if (isLoading) {
      return (
        <div className={s.favoriteCont}>
          <CircularProgressbar className={s.loader} value={65} strokeWidth={10} />
        </div>
      )
    }


  return (
      <div className={s.favoriteCont}>
        <ul className={s.favoriteList}>
          {favorites.map((i, index) => (
            <li key={index} className={s.listItem}>
              <img src={i.gameId.thumbnail} alt="" />
              <FaRegHeart
                className={`${s.heart} ${i.gameId.isFavorite ? s.activeHeart : ""}`}
                onClick={() => handleRemoveFavorite(i._id)}
              />
              <div className={s.favoriteInfo}>
                <div>{i.gameId.title}</div>
                <div>{i.gameId.platform}</div>
                <div>{i.gameId.price}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }


export default Favorites