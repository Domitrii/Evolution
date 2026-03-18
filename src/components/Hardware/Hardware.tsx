import mouse from "../../img/mouse.png"
import setup from "../../img/setup.png"
import headphones from "../../img/headphones.png"
import s from "./Hardware.module.scss"

function Hardware() {
  return (
    <section className={s.container}>
        <div className={s.hardwareSec}>
            <p className={s.gearUp}>Gear Up</p>
            <h1 className={s.title}>Hardware</h1>
            <ul className={s.hardwareList}>
                <li>
                    <img src={mouse} alt="" />
                    <div className={s.hardwareInfo}>
                        <p className={s.infoT}>MICE</p>
                        <p className={s.hardwareItemName}>Razer Basilisk V3 Pro Wireless Gaming Mouse | Black</p>
                        <div className={s.hardwarePrice}>
                            <p>$89.99</p>
                            <button>ADD TO CART</button>
                        </div>
                    </div>
                </li>
                <li>
                    <img src={setup} alt="" />
                    <div className={s.hardwareInfo}>
                        <p className={s.infoT}>Screen</p>
                        <p className={s.hardwareItemName}>Dell 27 200Hz Monitor - SE2725HG</p>
                        <div className={s.hardwarePrice}>
                            <p>$189.99</p>
                            <button>ADD TO CART</button>
                        </div>
                    </div>
                </li>
                <li>
                    <img src={headphones} alt="" />
                    <div className={s.hardwareInfo}>
                        <p className={s.infoT}>HeadPhones</p>
                        <p className={s.hardwareItemName}>Razer DeathAdder Essential</p>
                        <div className={s.hardwarePrice}>
                            <p>$119.99</p>
                            <button>ADD TO CART</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </section>
  )
}

export default Hardware