import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInUser } from '../services/auth.service';

const SignFormComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidMessage, setInvalidMessage] = useState();

    const sign = async () => {
        if (!username || !password || !email) {
            return setInvalidMessage(<p className="mb-3 text-center invalid-message">Veuillez remplir les champs</p>);
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return setInvalidMessage(<p className="mb-3 text-center invalid-message">Veuillez saisir une adresse email valide</p>);
        }
        try {
            const user = await signInUser(username, email, password);
            dispatch(setUser(user));
            setInvalidMessage(null);
            navigate('/');
        } catch (e) {
            if (e.response.status === 409) {
                return setInvalidMessage(<p className="mb-3 text-center invalid-message">Pseudo ou Email déjà pris</p>);
            }
            console.error(e);
            return setInvalidMessage(<p className="mb-3 text-center invalid-message">Une erreur est survenue, veuillez réessayer plus tard</p>);
        }
    };

    return (
        <div className="col-5 d-flex justify-content-center">
            <div className="row" id="registerForm">
                <h3 className="p-3 text-center ">Inscription</h3>
                {invalidMessage}
                <div className="form-floating mb-3">
                    <input
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        value={username}
                        type="text"
                        className="form-control"
                        id="floatingPseudo"
                        placeholder="Pseudo"
                    />
                    <label htmlFor="floatingInput">Pseudo</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        value={email}
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="E-mail"
                    />
                    <label htmlFor="floatingInput">Adresse mail</label>
                </div>
                <div className="form-floating ">
                    <input
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        value={password}
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Mot de passe"
                    />
                    <label htmlFor="floatingPassword">Mot de passe</label>
                </div>
                <span className="mt-3 d-flex justify-content-center">
                    <button className="btnForm" onClick={sign}>
                        <span>Inscription</span>
                    </button>
                </span>
            </div>
        </div>
    );
};

export default SignFormComponent;
