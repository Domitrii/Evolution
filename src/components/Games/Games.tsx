import { useEffect, useState } from "react"
import 'react-circular-progressbar/dist/styles.css';
import { getGames } from "../../api/games"
import type { Game } from "../../types/api"
import { CircularProgressbar } from "react-circular-progressbar"
import { NavLink } from "react-router-dom"
import s from "./Games.module.scss"

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

  return (
    <div className={s.container}>
        <div className={s.gamesSec}>
            {isLoader ? <CircularProgressbar className={s.loader} value={65} strokeWidth={10} /> : 
            <ul className={s.gameList}>
                {isGames.map((i,index) => (
                    <NavLink
                        to={`/game/${i._id}`}
                        state={{game: i}}
                        key={`${i._id}-${index}`} className={s.gameListItem}
                    >
                        <img src={i.thumbnail} alt="game image" />
                        <div className={s.gameItemInfo}>
                            <div className={s.gameItemTitle}>{i.title}</div>
                            <div>{i.platform}</div>
                            <div className={s.gameItemPrice}>{i.price}</div>
                        </div>
                    </NavLink>
                ))}
            </ul>
            }
        </div>
    </div>
  )
}

export default Games