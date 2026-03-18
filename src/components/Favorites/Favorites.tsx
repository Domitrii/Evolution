import { useEffect, useState } from "react"
import { getFavorites, removeFavorite } from "../../api/games"
import type { Game } from "../../types/api"
import toast from "react-hot-toast"
import { useAuth } from "../AuthContext/useAuth"
import { CircularProgressbar } from "react-circular-progressbar"
import s from "./Favorites.module.scss"
import { NavLink } from "react-router-dom"
import { FaRegHeart } from "react-icons/fa"

function Favorites() {
  const [favorites, setFavorites] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const {token} = useAuth()

  useEffect(() => {
    if(!token) {
      setFavorites([]);
      return;
    }
    const fetchFavorites = async () => {
      try {
      setIsLoading(true)
      const data = await getFavorites()
      if(data){
        setFavorites(data.map(i => i.gameId))
      } else {
        console.log("message")
        toast.custom(<div>
          Failed to fetch favorites
          </div>, {duration: 1300})
      }} catch (error) {
        console.log(error)
      } 
      finally {
        setIsLoading(false)
      }
    }
    fetchFavorites()
  }, [token])

  const handleRemoveFavorite = async (gameId:number) => {
    try{
      // console.log(gameId)
      await removeFavorite(gameId)
      setFavorites(prev => prev.filter(game => game._id != gameId))
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className={s.favoriteCont}>
      {!token || token == "" ? <div className={s.accountMsg}>You should have an <NavLink to="/signup">account</NavLink> to have favorite games</div> : isLoading ? 
        <CircularProgressbar className={s.loader} value={65} strokeWidth={10} /> : 
        <ul className={s.favoriteList}>
        {favorites.map((i,index) => (
          <li key={index} className={s.listItem}>
            <img src={i.thumbnail} alt="" />
            <FaRegHeart
                className={`${s.heart} ${i.isFavorite ? s.activeHeart : ""}`}
                onClick={() => handleRemoveFavorite(i._id)}
              />
            <div className={s.favoriteInfo}>
              <div>{i.title}</div>
              <div>{i.platform}</div>
              <div>{i.price}</div>
            </div>
          </li>
        ))}
      </ul>}
    </div>
  )
}

export default Favorites