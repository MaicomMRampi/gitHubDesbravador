import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorPage from './routes/errorPage';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import DetailsPerfil from './routes/detalhesperfil';
import Header from './components/NavBar';
import { Providers } from './Providers';

// Layout que será renderizado em todas as páginas
function Layout() {
  return (
    <div>
      <Header /> {/* Cabeçalho renderizado em todas as páginas */}
      <main>
        <Outlet /> {/* Aqui o conteúdo das páginas será renderizado */}
      </main>
    </div>
  );
}

// Definição das rotas com o layout incluído
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout envolve todas as rotas
    children: [
      {
        path: "/",
        element: <App />, // Página inicial
      },
      {
        path: "detalhesperfil",
        element: <DetailsPerfil />, // Página de detalhes do perfil
      },
    ],
  },
  {
    path: "*", // Qualquer rota não encontrada
    element: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>
);

// Para medir a performance da aplicação
reportWebVitals();
