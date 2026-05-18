import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import './App.css'
import { apiRestoreAuth } from './redux/auth/authThunc.ts';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './redux/store.ts';

import PrivateRoute from './components/PrivateRoute.tsx';
const HomePage = lazy(() => import("./pages/HomePage/HomePage"))
const NavBar = lazy(() => import("./pages/NavBar/NavBar.tsx"))
const GamesPage = lazy(() => import("./pages/GamesPage/GamesPage.tsx"))
const AboutPage = lazy(() => import("./pages/AboutPage/AboutPage.tsx"))
const AccountPage = lazy(() => import("./pages/AccountPage/AccountPage.tsx"))
const BasketPage = lazy(() => import("./pages/BasketPage/BasketPage.tsx"))
const CommunityPage = lazy(() => import("./pages/CommunityPage/CommunityPage.tsx"))
const HardwarePage = lazy(() => import("./pages/HardwarePage/HarwarePage.tsx"))
const SignUp = lazy(() => import('./components/SignUp/SignUp.tsx'))
const FavoritePage = lazy(() => import('./pages/FavoritePage/FavoritePage.tsx'));
const GameOverView = lazy(() => import("./components/GamerOverView.tsx/GameOverView.tsx"));
// const PrivateRoute = lazy(() => import("./components/PrivateRoute.tsx"));
const Login = lazy(() => import("./components/Login/Login.tsx"));

const App = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
      dispatch(apiRestoreAuth())
  }, [dispatch])

  return (
          <Suspense>
    <HelmetProvider>
      <Toaster />
          <NavBar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path="/game/:id" element={<GameOverView />} />
            <Route path='/games' element={<GamesPage />} />
            <Route path='/community' element={<CommunityPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/account' element={<PrivateRoute><AccountPage /></PrivateRoute>} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/basket' element={<BasketPage />} />
            <Route path='/hardware' element={<HardwarePage />} />
            <Route path='/favorites' element={<FavoritePage />} />
          </Routes>
        </HelmetProvider>
        </Suspense>
  )
}

export default App
