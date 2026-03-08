import { useLocation } from "react-router-dom";
import s from "./GameOverView.module.scss"


function GameOverView() {
  const { state } = useLocation();
  const game = state?.game;

  return (
    <div className={s.container}>
      <div className={s.itemBlock}>

        <img src={game.thumbnail} alt="" />
        <div>{game.title}</div>
        <div>{game.publisher}</div>
        <div>{game.description}</div>
        <div>{game.genre}</div>
        <div>{game.platform}</div>
        <div>{game.publisher}</div>
        <div>{game.release_data}</div>
        <div>{game.price}</div>
      </div>
    </div>
  )
}

export default GameOverView