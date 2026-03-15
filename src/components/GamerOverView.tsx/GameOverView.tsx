import { useLocation } from "react-router-dom";
import s from "./GameOverView.module.scss"
import { addFavorite } from "../../api/games";
import { FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";


function GameOverView() {
  const { state } = useLocation();
  const game = state?.game;


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
          <FaRegHeart className={s.heart} onClick={() => onFavClick(game._id)} />
        </div>
        {/* <div>Title: {game.title}</div>
        <div>Publisher: {game.publisher}</div>
        <div>Description: {game.description}</div>
        <div>Genre: {game.genre}</div>
        <div>Platform: {game.platform}</div>
        <div>Release Date: {game.release_data}</div>
        <div>Price: {game.price}</div> */}
      </div>
    </div>
  )
}

export default GameOverView