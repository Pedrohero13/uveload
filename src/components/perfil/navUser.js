import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import { logout } from "../../service/firebase";
import Archivos from "./archivos";
import Nuevo from "./nuevo";

export default function NavUser(props) {
    const { user } = props;
    return (
        <div>
            <Router>
                <nav class="navbar navbar-expand-lg navbar-light bg-light ">
                    <div class="container-fluid ">
                        <a class="navbar-brand" >UVEUPLOAD</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <Link to="/archivos" class="nav-link active" aria-current="page" >Archivos</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to="/nuevo" class="nav-link active" aria-current="page" >Nuevo</Link>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {user?.email}
                                    </a>
                                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li>
                                            <Link to="/archivos" class="dropdown-item" >Estado</Link>
                                        </li>
                                        <li>
                                            <Link to="/archivos" class="dropdown-item" >Configuración</Link>
                                        </li>
                                        <li>
                                            <hr class="dropdown-divider" />
                                        </li>
                                        <li>
                                            <a onClick={logout} class="dropdown-item" href="">Cerrar sesión</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="nav-item">
                                    <img src={user?.photoURL} class="img-thumbnail" alt="..."  width={50} height={50} />
                                </li>
                            </ul>

                        </div>
                    </div>
                </nav>
                <Routes>
                    <Route path='/archivos' element={<Archivos />} />
                    <Route path='/nuevo' element={<Nuevo />} />
                    
                </Routes>
            </Router>
        </div>
    )
}
