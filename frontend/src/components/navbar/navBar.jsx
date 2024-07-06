import styles from './navbar.module.css';
import { MdEventAvailable } from "react-icons/md";
import { TbCategory2 } from "react-icons/tb";
import { Link } from 'react-router-dom';
import LogOut from '../../pages/usuarios/logout/LogOut';

export default function NavBar() {
    return (
        <nav className={styles.navbarContainer}>
            <div className={styles.navbarItens}>
                <Link to={'/'}>
                    <img className={styles.logo} src="../../../public/activity_icon_183756.png" alt="logo atividades" />
                </Link>
                <div className={styles.navbarMenu}>
                    <Link to={'/'}>
                        Atividades
                    </Link>
                    <Link to={'/addAtividade'}>
                        <MdEventAvailable />
                        Nova Atividade
                    </Link>

                    <Link to={'/categorias'}>
                        <TbCategory2 />
                        Categorias
                    </Link>

                    <LogOut />
                </div>
            </div>

            <div className={styles.mobileNavbar}>
                <Link to={'/'}>
                    <img className={styles.logo} src="../../../public/activity_icon_183756.png" alt="logo atividades" />
                </Link>
                <div className={styles.navbarMenu}>
                    <Link to={'/'}>
                        Atividades
                    </Link>
                    <Link to={'/addAtividade'}>
                        <MdEventAvailable />
                    </Link>
                    <Link to={'/categorias'}> 
                        <TbCategory2 /> 
                    </Link>
                </div>
            </div>
        </nav>
    )
}

