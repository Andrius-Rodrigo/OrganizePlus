import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Receitas from "./pages/Receitas";
import Despesas from "./pages/Despesas";
import Categorias from "./pages/Categorias";
import Perfil from "./pages/Perfil";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/receitas" element={<Receitas />} />
                <Route path="/despesas" element={<Despesas />} />
                <Route path="/categorias" element={<Categorias />} />
                <Route path="/perfil" element={<Perfil />} />
                
            </Routes>

        </BrowserRouter>

    );

}

export default App;