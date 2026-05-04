import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import './App.css'
const HomePage = lazy(() => import("./pages/HomePage/HomePage"))
const NavBar = lazy(() => import("./pages/NavBar/NavBar.tsx"))
const GamesPage = lazy(() => import("./pages/GamesPage/GamesPage.tsx"))
const AboutPage = lazy(() => import("./pages/AboutPage/AboutPage.tsx"))
const AccountPage = lazy(() => import("./pages/AccountPage/AccountPage.tsx"))
const BasketPage = lazy(() => import("./pages/BasketPage/BasketPage.tsx"))
const CommunityPage = lazy(() => import("./pages/CommunityPage/CommunityPage.tsx"))
const HardwarePage = lazy(() => import("./pages/HardwarePage/HarwarePage.tsx"))
import { HelmetProvider } from 'react-helmet-async';
import type { BasketItem } from './types/api.ts';
const SignUp = lazy(() => import('./components/SignUp/SignUp.tsx'))
const FavoritePage = lazy(() => import('./pages/FavoritePage/FavoritePage.tsx'));
const GameOverView = lazy(() => import("./components/GamerOverView.tsx/GameOverView.tsx"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute.tsx"));
const Login = lazy(() => import("./components/Login/Login.tsx"));

const App = () => {
const [isIdStore, setIsIdStore] = useState<BasketItem[]>(() => {
  const stored = localStorage.getItem("basket");
  return stored ? JSON.parse(stored) : [];
});

const addItemToBasket = (id: string) => {
  setIsIdStore(prev => 
    prev.some(item => item.id === id) ? prev : [...prev, { id }]
  );
};

const removeItemFromBasket = (id: string) => {
  setIsIdStore(prev => prev.filter(item => item.id !== id))
}

useEffect(() => {
  localStorage.setItem("basket", JSON.stringify(isIdStore));
}, [isIdStore]);
const allIds = isIdStore.map(item => item.id)

return (
    <Suspense>
      <Toaster />
      <HelmetProvider>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/game/:id" element={<GameOverView addItemToBasket={addItemToBasket} isIdStore={isIdStore} removeItemFromBasket={removeItemFromBasket} />} />
          <Route path='/games' element={<GamesPage />} />
          <Route path='/community' element={<CommunityPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/account' element={<PrivateRoute><AccountPage /></PrivateRoute>} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/basket' element={<BasketPage allIds={allIds} removeItemFromBasket={removeItemFromBasket} />} />
          <Route path='/hardware' element={<HardwarePage />} />
          <Route path='/favorites' element={<FavoritePage />} />
        </Routes>
      </HelmetProvider>
    </Suspense>
  )
}

export default App
