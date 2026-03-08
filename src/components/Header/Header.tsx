import s from "./Header.module.scss"
import headerImg from "../../img/MainBack.png"
import { NavLink } from "react-router-dom"

function Header() {
  return (
    <section className={s.container}>
            <div className={s.header}>
                <div className={s.topImgCont}>
                    <img src={headerImg} alt="" />
                    <span className={s.shadow}></span>
                    <div className={s.headerContent }>
                        <p className={s.headerSubtitle}>Level Up Your Game</p>
                        <h1 className={s.headerTitle}>EVOLUTION</h1>
                        <p className={s.headerDescription}>Premium games, elite hardware, and expert reviews — everything a gamer needs under one roof.</p>
                        <ul className={s.headerButtons}>
                            <li><NavLink to="/games">BROWSE GAMES</NavLink></li>
                            <li><NavLink to="/hardware">EXPLORE HARDWARE</NavLink></li>
                        </ul>  
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Header