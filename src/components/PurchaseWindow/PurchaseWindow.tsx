import s from "./PurchaseWindow.module.scss"

function PurchaseWindow({setIsPay}: {setIsPay: (value: boolean)=> void}) {
  return (
    <div className={s.purchaseWindow} onClick={() => setIsPay(false)}>
        <div className={s.purchaseSec}>
            
        </div>
    </div>
  )
}

export default PurchaseWindow