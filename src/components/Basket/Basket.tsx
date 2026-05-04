import { useEffect, useState } from "react"
import { getFavorites, purchaseBasket } from "../../api/games"
import { useAuth } from "../AuthContext/useAuth"
import type { Game } from "../../types/api"


function Basket() {
    const [isFav, setIsFav] = useState([])

    useEffect(() => {
        const fetchPurchase = async () => {
            const data = await getFavorites()
            setIsFav(data.map(i => i.gameId))
            const ids = localStorage.getItem("id")
            console.log(ids)
    }
    fetchPurchase()
}, [])

  return (
    <div>
        <div>
            {isFav.map((i:Game,index) => (
                <li key={index}>
                    <div>price: {i.price}</div>
                    <img src={i.thumbnail} alt="" />
                </li>
            ))}
        </div>
        {/* {isPay ? <PurchaseWindow setIsPay={setIsPay} /> : ""} */}
    </div>
  )
}

export default Basket