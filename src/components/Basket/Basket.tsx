import { useEffect, useState } from "react"
import { getGames } from "../../api/games"
import { MdOutlineDelete } from "react-icons/md";
import s from "./Basket.module.scss"
import type { Game } from "../../types/api";
import PurchaseWindow from "../PurchaseWindow/PurchaseWindow";

function Basket({ allIds, removeItemFromBasket }: { 
  allIds: string[] 
  removeItemFromBasket: (id: string) => void
}) {
  const [isIdsItem, setIsIdsItem] = useState<Game[]>([])
  const [isSum, setIsSum] = useState(0)
  const [isPay, setIsPay] = useState(false)

  useEffect(() => {
  const fetchPurchase = async () => {
    try {
      const allGames = await getGames()
      const basketGames = allGames.filter(game => allIds.includes(game._id))
      setIsIdsItem(basketGames)
    } catch (error) {
      console.error(error)
    }
  }
  fetchPurchase()
}, [allIds])

useEffect(() => {
  setIsSum(0)
  isIdsItem.map(i => {
        setIsSum(prev => prev += i.price)
      })
}, [isIdsItem])

const fetchPayBtn = () => {
  setIsPay(true)
}

  return (
    <div className={s.purchasePage}>
      <div className={s.leftSec}>
        <ul className={s.purchaseSection}>
            {isIdsItem.map((i,index) => (
                <li key={index} className={s.purchaseItem}>
                    <img src={i.thumbnail} alt="" />
                    <div className={s.itemInfo}>
                      <div>{i.title}</div>
                      <div>{i.price}</div>
                      <MdOutlineDelete className={s.deleteBtn} onClick={() => removeItemFromBasket(i._id)} />
                    </div>
                </li>
            ))}
        </ul>
      </div>
        <div className={s.purchaseRightSec}>
          <div className={s.logo}>Evolution</div>
          <ul className={s.buyScroll}>
          {isIdsItem.map((i,index) => (
              <li key={index}>
                <div>{i.title}</div>
                <div>
                  <div>{i.price}</div>
                  <MdOutlineDelete className={s.deleteBtn} onClick={() => removeItemFromBasket(i._id)} />
                </div>
              </li>
          ))}
          </ul>
          <div className={s.buyAllow}>
            <div>Total: {isSum.toFixed(2)}</div>
            <button className={s.btn} onClick={fetchPayBtn}>Pay</button>
          </div>
        </div>
        {isPay ? <PurchaseWindow setIsPay={setIsPay} /> : ""}
    </div>
  )
}

export default Basket