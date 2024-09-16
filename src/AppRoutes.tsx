import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainRoute from './components/MainRoute'
import Home from './components/Home/Home'
import NotFound from './components/NotFound/NotFound'
import LoginRegister from './components/LoginRegister/LoginRegister'
import ForgotPassword from './components/LoginRegister/ForgotPassword';
import LogoutGuard from './guards/LogoutGuard'
import Explore from './components/Explore/Explore'
import ProductDetailed from './components/ProductDetailed/ProductDetailed'
import Wishlist from './components/Wishlist/Wishlist'

export default function AppRoutes() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path='/' element={
          <MainRoute />
        }>

          <Route index element={
            <Navigate to="/home" replace />
          } />

          <Route path='home' element={
            <Home />
          } />

          <Route path='explore' element={
            <Explore />
          } />

          <Route path='wishlist' element={
            <Wishlist />
          } />

          <Route path='product'>

            <Route index element={
              <Navigate to="/" replace />
            } />

            <Route path=':id' element={
              <ProductDetailed />
            } />

          </Route>

          <Route path='contribute' element={
            <Home />
          } />

          <Route path='contact-us' element={
            <Home />
          } />

          <Route path='auth' element={
            <LogoutGuard>
              <LoginRegister />
            </LogoutGuard>
          } />

          <Route path='forgot-password' element={
            <ForgotPassword />
          } />

          <Route path='not-found' element={
            <NotFound />
          } />

        </Route>

        <Route path='*' element={
          <Navigate to={"/not-found"} replace />
        } />

      </Routes>

    </BrowserRouter>
  )
}
