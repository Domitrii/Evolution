import { useLocation } from "react-router-dom";
import s from "./GameOverView.module.scss"
import { addFavorite, removeFavorite } from "../../api/games";
import { FaRegHeart } from "react-icons/fa";
import { BsBasket2Fill } from "react-icons/bs";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";


function GameOverView({addItemToBasket, removeItemFromBasket, isIdStore}: {
  addItemToBasket: (id:string)=>void
  removeItemFromBasket: (id: string) => void
  isIdStore: []
}) {
  const { state } = useLocation();
  const game = state?.game;
  const [isFav, setIsFav] = useState(false)
  const [isIncluded, setIsIncluded] = useState(false)
  

  useEffect(() => {
    const run = async () => {
      await setIsFav(game.isFavorite)
    }
    run()
  }, [])

  useEffect(() => {
    isIdStore.filter(g => {
        if(g.id == game._id){
          console.log(`here: ${g.id} and ${game._id}`)
          setIsIncluded(true)
        } else {
          setIsIncluded(false)
        }
      })
  }, [isIdStore])

  const fetchAddRemove = (id: string) => {
    if(isIncluded) {
      console.log("here")
      removeItemFromBasket(id)
    } else {
      console.log("not here")
      addItemToBasket(id)
    }
  }

  const onFavClick = async (id:number) => {
    if(game.isFavorite){
      try{
        await removeFavorite(id)
        setIsFav(false)
        toast.custom(<div className={s.toastStyle}>Deleted from favorites</div>, {duration: 1300})
      } catch (error) {
        console.error(error)
      }
    } else {
      try{
        await addFavorite(id)
        setIsFav(true)
        toast.custom(<div className={s.toastStyle}>Failed to remove favorite</div>, {duration: 1300})
      } catch (error) {
        console.error(error)
      }
    }
}   


  return (
    <div className={s.container}>
      <div className={s.itemBlock}>
        <div className={s.titleBlock}>
          <span className={s.title}>{game.title}</span>
          <img src={game.thumbnail} alt="" />
        </div>
        <div className={s.infoBlock}>
          <div>
            <p>Publisher:</p>
            <span>{game.publisher}</span>
          </div>
          <div>
            <p>Description:</p>
            {game.description && <span>{game.description}</span>}
            {!game.description && <span>No description available</span>}
          </div>
          <div>
            <p>Genre:</p>
            <span>{game.genre}</span>
          </div>
          <div>
            <p>Platform:</p>
            <span>{game.platform}</span>
          </div>
          <div>
            <p>Release Date:</p>
            <span>{game.release_data}</span>
          </div>
          <div>
            <p>Price:</p>
            <span>{game.price}</span>
          </div>
          <div className={s.interact}>
            <FaRegHeart className={`${s.heart} ${isFav ? s.favorite : ""}`} onClick={() => onFavClick(game._id) } />
            <BsBasket2Fill className={`${s.basket} ${isIncluded ? s.included : s.notIncluded}`} onClick={() => fetchAddRemove(game._id)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameOverView