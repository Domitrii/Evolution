import { useLocation } from "react-router-dom";
import s from "./GameOverView.module.scss"
import { addFavorite, removeFavorite } from "../../api/games";
import { FaRegHeart } from "react-icons/fa";
import { BsBasket2Fill } from "react-icons/bs";
import toast from "react-hot-toast";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { selectIsInBasket } from "../../redux/basket/selectors";
import { addItem, removeItem } from "../../redux/basket/basketSlice";

function GameOverView() {
  const { state } = useLocation();
  const game = state?.game;
  const [isFav, setIsFav] = useState(game.isFavorite)
  const dispatch = useDispatch<AppDispatch>()
  const isIncluded = useSelector(selectIsInBasket(game._id)) 

  const fetchAddRemove = (id: string) => {
    if (isIncluded) {
      dispatch(removeItem(id))
    } else {
      dispatch(addItem(id))
    }
  }

  const onFavClick = async (id: number) => {
    if (isFav) {
      try {
        await removeFavorite(id)
        setIsFav(false)
        toast.custom(<div className={s.toastStyle}>Deleted from favorites</div>, { duration: 1300 })
      } catch (error) {
        console.error(error)
      }
    } else {
      try {
        await addFavorite(id)
        setIsFav(true)
        toast.custom(<div className={s.toastStyle}>Added to favorites</div>, { duration: 1300 })
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
          <div><p>Publisher:</p><span>{game.publisher}</span></div>
          <div>
            <p>Description:</p>
            {game.description
              ? <span>{game.description}</span>
              : <span>No description available</span>
            }
          </div>
          <div><p>Genre:</p><span>{game.genre}</span></div>
          <div><p>Platform:</p><span>{game.platform}</span></div>
          <div><p>Release Date:</p><span>{game.release_data}</span></div>
          <div><p>Price:</p><span>{game.price}</span></div>
          <div className={s.interact}>
            <FaRegHeart
              className={`${s.heart} ${isFav ? s.favorite : ""}`}
              onClick={() => onFavClick(game._id)}
            />
            <BsBasket2Fill
              className={`${s.basket} ${isIncluded ? s.included : s.notIncluded}`}
              onClick={() => fetchAddRemove(game._id)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameOverView