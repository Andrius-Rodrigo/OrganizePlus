import { Link } from "react-router-dom";
import {
    FaHome,
    FaMoneyBillWave,
    FaWallet,
    FaTags,
    FaUser,
    FaSignOutAlt
} from "react-icons/fa";

import "../styles/sidebar.css";

function Sidebar() {

    return (

        <div className="sidebar">

            <h2 className="logo">
                Organize+
            </h2>

            <nav>

                <Link to="/dashboard">
                    <FaHome />
                    Dashboard
                </Link>

                <Link to="/receitas">
                    <FaMoneyBillWave />
                    Receitas
                </Link>

                <Link to="/despesas">
                    <FaWallet />
                    Despesas
                </Link>

                <Link to="/categorias">
                    <FaTags />
                    Categorias
                </Link>

                <Link to="/perfil">
                    <FaUser />
                    Perfil
                </Link>

            </nav>

            <button
                className="logout"
                onClick={() => {

                    localStorage.removeItem("token");
                    window.location.href="/";

                }}
            >

                <FaSignOutAlt />

                Sair

            </button>

        </div>

    );

}

export default Sidebar;