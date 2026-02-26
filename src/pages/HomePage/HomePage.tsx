import s from "./HomePage.module.scss"
import WWM from "../../img/WWM-Header.jpg"
import { GoDeviceDesktop } from "react-icons/go";
import { FaPlaystation } from "react-icons/fa";
import { FaXbox } from "react-icons/fa";
// import RE from "../../img/RE-Header.jpg"
// import { useState } from "react"

function HomePage() {
    // const a = useState([WWM,RE])
  return (
    <>  
        <section className={s.container}>
            <div className={s.header}>
                <div className={s.topImgCont}>
                    <img src={WWM} alt="" />
                    <span className={s.shadow}></span>
                    <ul className={s.gameTypes}>
                        <li>
                            <GoDeviceDesktop />
                            <span>PC</span>
                        </li>
                        <li>
                            <FaPlaystation />
                            <span>PlayStation</span>
                        </li>
                        <li>
                            <FaXbox />
                            <span>XBox</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={s.trending}>
                
            </div>
        </section>
    </>
  )
}

export default HomePage