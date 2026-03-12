import Favorites from "../../components/Favorites/Favorites"
import Footer from "../../components/Footer/Footer"
import PageTitle from "../../helper/PageTitle"


function FavoritePage() {
  return (
    <div>
        <PageTitle>Favorite</PageTitle>
        <Favorites />
        <Footer />
    </div>
  )
}

export default FavoritePage