import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import SearchMovie from './components/searchMovie/SearchMovie.tsx';
import Home from './components/home/Home.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
    {
      path:"/",
      element: <Home/>,
    },
    {
      path:"/Search Movie",
      element: <SearchMovie/>,
    }, 
  ]
}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
