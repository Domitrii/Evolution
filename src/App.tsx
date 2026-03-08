import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react';
import './App.css'
const HomePage = lazy(() => import("./pages/HomePage/HomePage"))
const NavBar = lazy(() => import("./pages/NavBar/NavBar.tsx"))
const ProductsPage = lazy(() => import("./pages/ProductsPage/ProductsPage.tsx"))
const AboutPage = lazy(() => import("./pages/AboutPage/AboutPage.tsx"))
const AccountPage = lazy(() => import("./pages/AccountPage/AccountPage.tsx"))
const BasketPage = lazy(() => import("./pages/BasketPage/BasketPage.tsx"))
const CommunityPage = lazy(() => import("./pages/CommunityPage/CommunityPage.tsx"))
const HardwarePage = lazy(() => import("./pages/HardwarePage/HarwarePage.tsx"))
import { HelmetProvider } from 'react-helmet-async';
const GameOverView = lazy(() => import("./components/GamerOverView.tsx/GameOverView.tsx"));

const App = () => {
return (
    <Suspense>
      <HelmetProvider>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/game/:id" element={<GameOverView />} />
          <Route path='/games' element={<ProductsPage />} />
          <Route path='/community' element={<CommunityPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/basket' element={<BasketPage />} />
          <Route path='/hardware' element={<HardwarePage />} />
        </Routes>
      </HelmetProvider>
    </Suspense>
  )
}

export default App
