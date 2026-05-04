import Basket from "../../components/Basket/Basket"
import PageTitle from "../../helper/PageTitle"


function BasketPage({ allIds, removeItemFromBasket}: { 
  allIds: string[]
  removeItemFromBasket: (id: string) => void
}) {
  return (
    <div>
      <PageTitle>Basket</PageTitle>
      <Basket allIds={allIds} removeItemFromBasket={removeItemFromBasket} />
    </div>
  )
}

export default BasketPage