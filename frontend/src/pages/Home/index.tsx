import { ReactComponent as AuthImage }  from "assets/images/Desenho.svg";
import Login from "./Login";

import './styles.css';

const Home = () => {
    return(
        <div className="home-container">
            <div className="home-description-container">
                <h1 className="home-title">Avalie Filmes</h1>
                <p className="home-description">Diga o você achou do seu <br /> filme favorito</p>
                <AuthImage />
            </div>
            <div className="home-login-container">
                <Login />
            </div>
        </div>
    );
}

export default Home;