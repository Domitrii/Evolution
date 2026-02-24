import { Route, Routes } from 'react-router-dom'
import { lazy } from 'react';
import './App.css'
const HomePage = lazy(() => import("./pages/HomePage/HomePage"))

const App = () => {
return (
    <Routes>
      <Route path='/' element={<HomePage />} />
    </Routes>
  )
}

export default App
