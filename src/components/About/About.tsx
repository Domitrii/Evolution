import s from "./About.module.scss"
import { IoGameController } from "react-icons/io5";
import { MdOutlineShield } from "react-icons/md";
import { FaBoltLightning } from "react-icons/fa6";
import { AiOutlineGlobal } from "react-icons/ai";

function About() {
  return (
    <section className={s.container}>
        <div className={s.aboutSec}>
            <p className={s.subTitle}>OUR STORY</p>
            <h1 className={s.title}>About Evolution</h1>
            <p className={s.titleText}>Founded in 2026, Evolution started as a passion project by a group of hardcore gamers who were tired of mediocre stores. Today, we're one of the fastest-growing gaming destinations, serving players across 40+ countries with premium games, elite hardware, and honest reviews.</p>
            <ul className={s.aboutList}>
                <li className={s.aboutItem}>
                    <IoGameController />
                    <h3>Game First</h3>
                    <p>Every decision is made with players in mind. We live and breathe gaming.</p>
                </li>
                <li className={s.aboutItem}>
                    <MdOutlineShield />
                    <h3>Trusted Quality</h3>
                    <p>We curate only the best games and hardware, rigorously tested by our team.</p>
                </li>
                <li className={s.aboutItem}>
                    <FaBoltLightning />
                    <h3>Lightning Fast</h3>
                    <p>Instant digital delivery and same-day shipping on hardware orders.</p>
                </li>
                <li className={s.aboutItem}>
                    <AiOutlineGlobal />
                    <h3>Global Community</h3>
                    <p>Over 120K gamers worldwide trust Evolution as their go-to store.</p>
                </li>
            </ul>
            <div className={s.mission}>
                <h2>Our Mission</h2>
                <p>To create the ultimate gaming ecosystem where every player — casual or competitive — can find exactly what they need to level up their experience.</p>
            </div>
        </div>
    </section>
  )
}

export default About