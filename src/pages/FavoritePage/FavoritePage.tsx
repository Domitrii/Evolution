import Favorites from "../../components/Favorites/Favorites"
import Footer from "../../components/Footer/Footer"
import PageTitle from "../../helper/PageTitle"
import s from "../../components/Favorites/Favorites.module.scss"


function FavoritePage() {
  return (
    <div className={s.pageWrapper}>
        <PageTitle>Favorite</PageTitle>
        <Favorites />
        <div className={s.footerWrapper}>
          <Footer />
        </div>
    </div>
  )
}

export default FavoritePage