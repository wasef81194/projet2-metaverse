import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BackgroundComponent from '../components/background.component';
import { logoutUser } from '../services/auth.service';
import { removeUser } from '../store/slices/user.slice';

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    return (
        <div className="home">
            <BackgroundComponent />
            <div className="content">
                <h1 className="text-center neonText pt-4">Universe</h1>
                <div className="h-75 d-flex justify-content-center justify-content-xl-end  align-items-center ">
                    <div className="row w-25">
                        <span className="mt-3">
                            {user.updated > 0 && (
                                <div className="menu">
                                    <h2 className="navButton" onClick={() => navigate('/universe')}>
                                        Jouer
                                    </h2>
                                    <h2 className="navButton" onClick={() => navigate('/settings')}>
                                        Paramètres
                                    </h2>
                                    <h2 className="navButton">Crédits</h2>
                                    <h2
                                        className="navButton py-5"
                                        onClick={async () => {
                                            await logoutUser();
                                            dispatch(removeUser());
                                        }}
                                    >
                                        Déconnexion
                                    </h2>
                                </div>
                            )}
                            {user.updated === 0 && (
                                <div className="menu">
                                    <h2 className="navButton homePageConnexion" onClick={() => navigate('/authenticate')}>
                                        Connexion
                                    </h2>
                                </div>
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
