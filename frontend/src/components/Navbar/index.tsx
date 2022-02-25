import { AuthContext } from "AuthContext";
import { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { isAuthenticated } from "util/auth";
import { removeAuthData } from "util/storage";
import "./styles.css";

const Navbar = () => {

  const { authContextData, setAuthContextData } = useContext(AuthContext);

  const history = useHistory();

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({authenticated: false})
    history.replace("/")
  }

  useEffect(() => {
    if(isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
      });
    } else {
      setAuthContextData({
        authenticated: false
      })
    }  
  },[setAuthContextData])

  return (
    <nav className="navbar navbar-custom">
      <div className="navbar-container">
            <Link to="/movies" className="navbar-brand brand-custom">
              MovieFlix
            </Link>
        {authContextData.authenticated ? (
            <Link onClick={handleLogoutClick} to="#logout" className="btn-custom">
              SAIR
            </Link>) : ""}
      </div>
    </nav>
  );
};

export default Navbar;
