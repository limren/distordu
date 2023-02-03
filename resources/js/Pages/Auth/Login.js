import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = ({
    setPassword,
    setEmail,
    setUser,
    setIsAuth,
    email,
    password,
    setToken,
}) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password,
        };
        axios
            .post("http://distordu.test/api/login", data)
            .then((res) => res.data)
            .then((data) => {
                setUser(data.user);
                setToken(data.token);
                setIsAuth(true);
                setMessage(data.message);
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", JSON.stringify(data.token));
                localStorage.setItem("isAuthenticated", true);
                axios.create({
                    timeout: 1000,
                    headers: { Authorization: "Bearer " + data.token },
                });
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            });
    };
    return (
        <div className="login">
            <div>
                <h2>Ha, te voilà..</h2>
                <p>Nous sommes si peu heureux de te revoir !</p>
            </div>
            <div>
                <h2 className={message ? "alert green" : ""}>
                    {message ? message : ""}
                </h2>
            </div>
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="email">E-mail ou numéro de téléphone</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <input type="submit" value="Connexion" id="submit" />
                <p className="legend">
                    Pas de compte ?{" "}
                    <Link className="blue" to="/register">
                        Inscris-toi !
                    </Link>
                </p>
            </form>
        </div>
    );
};
