import PageTitle from "../../helper/PageTitle";
import MainGames from "../../components/MainGames/MainGames";
import Header from "../../components/Header/Header";
import Hardware from "../../components/Hardware/Hardware";
import Footer from "../../components/Footer/Footer";


function HomePage() {
  return (
    <>  
        <PageTitle>Home</PageTitle>
        <Header />
        <MainGames />
        <Hardware />
        <Footer />
    </>
  )
}

export default HomePage