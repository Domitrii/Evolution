import { FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react"
import 'react-circular-progressbar/dist/styles.css';
import { addFavorite, getFavorites, getGames, removeFavorite } from "../../api/games"
import type { Favorite, Game } from "../../types/api"
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
                const fav = await getFavorites();
                const favoriteIds = fav.map((f: Favorite) => {
                    const gameId =
                        typeof f.gameId === "object" && f.gameId !== null
                            ? (f.gameId as Game)._id
                            : f.gameId;
                    return Number(gameId);
                });

                const games = await getGames();
                const updatedGames = games.map(game => ({
                ...game,
                isFavorite: favoriteIds.includes(game._id),
                }));
                setIsGames(updatedGames);
            }
            catch (error) {
                console.error(error)
            } finally {
                setIsLoader(false)
            }
        }
        fetchGames()
    }, [])

    const onFavClick = async (gameId:number, isFavorite:boolean) => {
        if(isFavorite){
            try {
                await removeFavorite(gameId);
                setIsGames(prev => prev.map(game => game._id === gameId ? { ...game, isFavorite: false } : game))
                toast.custom(<div className={s.toastStyle}>Deleted from favorites</div>, {duration: 1300})
            } catch (e) {
                console.error(e);
                toast.custom(<div className={s.toastStyle}>Failed to remove favorite</div>, {duration: 1300})
            }
        } else {
            try {
                const created = await addFavorite(gameId)
                if(created){
                    setIsGames(prev => prev.map(game => game._id === gameId ? { ...game, isFavorite: true } : game))
                    toast.custom(<div className={s.toastSuccessStyle}>Favorite added</div>, {duration: 1300})
                } else {
                    toast.custom(<div className={s.toastStyle}>Failed to add favorite</div>, {duration: 1300})
                }
            } catch (e) {
                console.error(e);
                toast.custom(<div className={s.toastStyle}>Failed to add favorite</div>, {duration: 1300})
            }
        }
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
                            <FaRegHeart
                                className={`${s.heart} ${i.isFavorite ? s.activeHeart : ""}`}
                                onClick={() => onFavClick(i._id, i.isFavorite)}
                            />
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