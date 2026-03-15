import { FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react"
import 'react-circular-progressbar/dist/styles.css';
import { addFavorite, getGames } from "../../api/games"
import type { Game } from "../../types/api"
import { CircularProgressbar } from "react-circular-progressbar"
import { NavLink } from "react-router-dom"
import s from "./Games.module.scss"
import toast from "react-hot-toast";
// import { initAuthFromStorage } from "../../api/client"

function Games() {
    const [isGames, setIsGames] = useState<Game[]>([])
    const [isLoader, setIsLoader] = useState(true)

    useEffect(() => {
        const fetchGames = async () => {
            try{
                setIsLoader(true)
                const games = await getGames()
                setIsGames(games)
            }
            catch (error) {
                console.error(error)
            } finally {
                setIsLoader(false)
            }
        }
        fetchGames()
    }, [])

    // const userId = (() => {
    //     const auth = initAuthFromStorage() as { user?: { id?: string } } | undefined;
    //     return auth?.user?.id;
    // })();

    const onFavClick = async (id:number) => {
        const data = await addFavorite(id)
        if(!data){
            toast.custom(<div className={s.toastStyle}>
              Failed to add favorite
              </div>, {duration: 1300})
      
          } else {
            toast.custom(<div className={s.toastSuccessStyle}>
              Favorite added
              </div>, {duration: 1300})
          }
        return data
    }   

  return (
    <div className={s.container}>
        <div className={s.gamesSec}>
            {isLoader ? <CircularProgressbar className={s.loader} value={65} strokeWidth={10} /> : 
            <ul className={s.gameList}>
                {isGames.map((i,index) => (
                    <div key={`${i._id}-${index}`} className={s.gameListItem}>
                    <NavLink
                        to={`/game/${i._id}`}
                        state={{game: i}}
                        key={`${i._id}-${index}`} 
                        className={s.gameItemLink}
                    >
                        <img src={i.thumbnail} alt="game image" className={s.gameItemImage} />
                        </NavLink>
                        <div className={s.gameItemInfo}>
                            <div className={s.gameItemTitle}>{i.title}</div>
                            <div>{i.platform}</div>
                            <FaRegHeart className={s.heart} onClick={() => onFavClick(i._id)} />
                            <div className={s.gameItemPrice}>{i.price}</div>
                        </div>
                    </div>
                ))}
            </ul>
            }
        </div>
    </div>
  )
}

export default Games