import { NavLink } from "react-router-dom"
import s from "./Footer.module.scss"

function Footer() {
  return (
    <div className={s.container}>
        <div className={s.footerSec}>
            <ul className={s.footerList}>
                <li className={s.footerListItem}>
                    <NavLink to={"/"} className={s.footerLogo}>Evolution</NavLink>
                    <p>Your ultimate destination for games, hardware, and expert reviews.</p>
                </li>
                <li className={s.footerListItem}>
                    <h3>Shop</h3>
                    <NavLink to={"/games"}>Games</NavLink>
                    <NavLink to={"/hardware"}>Hardware</NavLink>
                </li>
                <li className={s.footerListItem}>
                    <h3>Company</h3>
                    <NavLink to={"/about"}>About Us</NavLink>
                    <NavLink to={"/community"}>Community</NavLink>
                    <NavLink to={"/"}>Contact</NavLink>
                </li>
                <li className={s.footerListItem}>
                    <h3>Support</h3>
                    <NavLink to={"/"}>Help Center</NavLink>
                </li>
            </ul>
            <div className={s.bottom}>
                <div>© 2026 Evolution Gaming. All rights reserved.</div>
                <ul>
                    <li>Privacy</li>
                    <li>Terms</li>
                    <li>Cookies</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Footer