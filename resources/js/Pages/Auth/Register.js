import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register = ({
    setPassword,
    setEmail,
    setUsername,
    username,
    password,
    email,
}) => {
    const navigate = useNavigate();
    const [birthdate, setBirthdate] = useState("");
    const [day, setDay] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    const [message, setMessage] = useState("");
    useEffect(() => {
        setBirthdate(`${day}-${month}-${year}`);
    }, [day, year, month]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            email: email,
            password: password,
            birthdate: birthdate,
        };
        axios
            .post("http://distordu.test/api/register", data)
            .then((res) => res.data)
            .then((data) => {
                setMessage(data.message);
                if (data.status) {
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                }
            });
    };
    return (
        <div className="register">
            <div>
                <h2>Créer un compte</h2>
            </div>
            <div>
                <h2 className={message ? "alert green" : ""}>
                    {message ? message : ""}
                </h2>
            </div>
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
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
                <div>
                    <fieldset>
                        <legend>Date de naissance</legend>
                        <div className="birthdate">
                            <select
                                required
                                onChange={(e) => setDay(e.target.value)}
                                id="day"
                                name="day"
                            >
                                <option value="" selected hidden>
                                    jour
                                </option>
                                <option value="01">1</option>
                                <option value="02">2</option>
                                <option value="03">3</option>
                                <option value="04">4</option>
                                <option value="05">5</option>
                                <option value="06">6</option>
                                <option value="07">7</option>
                                <option value="08">8</option>
                                <option value="09">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            <select
                                required
                                onChange={(e) => setMonth(e.target.value)}
                                id="month"
                                name="month"
                            >
                                <option value="" selected hidden>
                                    mois
                                </option>
                                <option value="01">Janvier</option>
                                <option value="02">Février</option>
                                <option value="03">Mars</option>
                                <option value="04">Avril</option>
                                <option value="05">Mai</option>
                                <option value="06">Juin</option>
                                <option value="07">Juillet</option>
                                <option value="08">Août</option>
                                <option value="09">Septembre</option>
                                <option value="10">Octobre</option>
                                <option value="11">Novembre</option>
                                <option value="12">Décembre</option>
                            </select>
                            <select
                                required
                                onChange={(e) => setYear(e.target.value)}
                                id="year"
                                name="year"
                            >
                                <option>year</option>
                                <option value="1940">1940</option>
                                <option value="1941">1941</option>
                                <option value="1942">1942</option>
                                <option value="1943">1943</option>
                                <option value="1944">1944</option>
                                <option value="1945">1945</option>
                                <option value="1946">1946</option>
                                <option value="1947">1947</option>
                                <option value="1948">1948</option>
                                <option value="1949">1949</option>
                                <option value="1950">1950</option>
                                <option value="1951">1951</option>
                                <option value="1952">1952</option>
                                <option value="1953">1953</option>
                                <option value="1954">1954</option>
                                <option value="1955">1955</option>
                                <option value="1956">1956</option>
                                <option value="1957">1957</option>
                                <option value="1958">1958</option>
                                <option value="1959">1959</option>
                                <option value="1960">1960</option>
                                <option value="1961">1961</option>
                                <option value="1962">1962</option>
                                <option value="1963">1963</option>
                                <option value="1964">1964</option>
                                <option value="1965">1965</option>
                                <option value="1966">1966</option>
                                <option value="1967">1967</option>
                                <option value="1968">1968</option>
                                <option value="1969">1969</option>
                                <option value="1970">1970</option>
                                <option value="1971">1971</option>
                                <option value="1972">1972</option>
                                <option value="1973">1973</option>
                                <option value="1974">1974</option>
                                <option value="1975">1975</option>
                                <option value="1976">1976</option>
                                <option value="1977">1977</option>
                                <option value="1978">1978</option>
                                <option value="1979">1979</option>
                                <option value="1980">1980</option>
                                <option value="1981">1981</option>
                                <option value="1982">1982</option>
                                <option value="1983">1983</option>
                                <option value="1984">1984</option>
                                <option value="1985">1985</option>
                                <option value="1986">1986</option>
                                <option value="1987">1987</option>
                                <option value="1988">1988</option>
                                <option value="1989">1989</option>
                                <option value="1990">1990</option>
                                <option value="1991">1991</option>
                                <option value="1992">1992</option>
                                <option value="1993">1993</option>
                                <option value="1994">1994</option>
                                <option value="1995">1995</option>
                                <option value="1996">1996</option>
                                <option value="1997">1997</option>
                                <option value="1998">1998</option>
                                <option value="1999">1999</option>
                                <option value="2000">2000</option>
                                <option value="2001">2001</option>
                                <option value="2002">2002</option>
                                <option value="2003">2003</option>
                                <option value="2004">2004</option>
                                <option value="2005">2005</option>
                                <option value="2006">2006</option>
                                <option value="2007">2007</option>
                                <option value="2008">2008</option>
                                <option value="2009">2009</option>
                                <option value="2010">2010</option>
                                <option value="2011">2011</option>
                                <option value="2012">2012</option>
                                <option value="2013">2013</option>
                                <option value="2014">2014</option>
                                <option value="2015">2015</option>
                                <option value="2016">2016</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                            </select>
                        </div>
                    </fieldset>
                </div>
                <input type="submit" value="Connexion" id="submit" />
                <p className="legend">
                    Vous êtes déjà inscrit ?{" "}
                    <Link className="blue" to="/home">
                        Connecte-toi !
                    </Link>
                </p>
            </form>
        </div>
    );
};
