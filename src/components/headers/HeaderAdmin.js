import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from "./HeaderAdmin.module.scss";
import { AuthContext } from '../../context';

const HeaderAdmin = () => {
    const navigate = useNavigate();

    const { user, signout } = useContext(AuthContext);

    return (
        <div className={`${styles.header} d-flex jcsb`}>
            <h1 className='d-flex aic ml30'>Espace Administrateur</h1>
            <ul className='d-flex mr30 aic'>
                <NavLink to="/">
                    <li className='pr40'>Retour à l'accueil</li>
                </NavLink>
                <NavLink onClick={async () => {
                    await signout();
                    navigate("/login");
                }}>
                    <li className='pr20'>Se déconnecter</li>
                </NavLink>
            </ul>
        </div>
    );
};

export default HeaderAdmin;