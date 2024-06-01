import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Products from './pages/Products.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}></Route>
    <Route path="/products" element={<Products />}></Route>
  </Routes>
</BrowserRouter>
)
