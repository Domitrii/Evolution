import { useEffect, useState } from "react"
import { getFavorites } from "../../api/games"
import type { Favorite, Game } from "../../types/api"
import toast from "react-hot-toast"
import { useAuth } from "../AuthContext/useAuth"
import s from "./Favorites.module.scss"

function Favorites() {
  const [favorites, setFavorites] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(false)
  // const [isGames, setIsGames] = useState<Favorite[]>([])
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
        // favorites.map(i => console.log(i))
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
  return (
    <div className={s.favoriteCont}>
      <ul className={s.favoriteList}>
        {favorites.map((i,index) => (
          <li key={index}>
            <img src={i.thumbnail} alt="" />
            <div className={s.favoriteInfo}>
              <div>{i.title}</div>
              <div>{i.platform}</div>
              <div>{i.price}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Favorites