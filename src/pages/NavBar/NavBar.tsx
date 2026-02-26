import { FaDragon } from "react-icons/fa";
import { FaShoppingBasket } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import s from "./NavBar.module.scss"
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isActive, setIsActive] = useState()

    const scrollHandler = () => {
        if (window.scrollY >= 50) {
            setIsScrolled(true)
        } else {
            setIsScrolled(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler)
    }, [])

  return (
    <div className={`${s.NavBar}`}>
        <div className={`${isScrolled ? s.headerBookMark : ""}`}></div>
        <div className={s.container}>
            <span className={s.logoCont}>
                <NavLink to="/"><FaDragon className={s.logoIcon} /><span><i>Evolution</i></span></NavLink>
            </span>
            <div className={s.options}>
                <ul>
                    <li><NavLink to="/" className={({isActive}) => isActive ? s.active : s.hoverTrue }>Game Store</NavLink></li>
                    <li><NavLink to="/products" className={({isActive}) => isActive ? s.active : s.hoverTrue }>Hardware</NavLink></li>
                    <li><NavLink to="/community" className={({isActive}) => isActive ? s.active : s.hoverTrue }>Community</NavLink></li>
                    <li><NavLink to="/about" className={({isActive}) => isActive ? s.active : s.hoverTrue }>About</NavLink></li>
                    <li><FaSearch className={s.search} /></li>
                </ul>
            </div>
            <ul className={`${s.packAndSearch}`}>
                <li><FaShoppingBasket className={s.basket} /></li>
                <li><NavLink to=""><MdAccountCircle className={s.accountIcon}/></NavLink></li>
            </ul>
        </div>
    </div>
  )
}

export default NavBar