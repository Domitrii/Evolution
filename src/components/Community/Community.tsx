import { NavLink } from "react-router-dom"
import s from "./Community.module.scss"

function Community() {
  return (
    <section className={s.container}>
        <div className={s.communitySec}>
            <div className={s.text}>
                <h1>No Posts Yet!</h1>
                <div>Community section will be available soon!!</div>
                <ul className={s.headerButtons}>
                    <li><NavLink to="/games">BROWSE GAMES</NavLink></li>
                    <li><NavLink to="/hardware">EXPLORE HARDWARE</NavLink></li>
                </ul>  
            </div>
        </div>
    </section>
  )
}

export default Community