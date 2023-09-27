import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import "./Header.module.scss";
import { AuthContext } from "../../context";

const Header = () => {
  const navigate = useNavigate();

  const { user, signout } = useContext(AuthContext);
  // console.log(user);

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  // const [pseudo, setPseudo] = useState('');
  // const [message, setMessage] = useState('');
  const [isOpen, setisOpen] = useState(false);

  const toggleDropdown = () => {
    setisOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
      if (isOpen) {
        setisOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, setVisible, setisOpen, isOpen]);

  return (
    <div
      className={`${styles.header} d-flex jcsb`}
      style={{ top: visible ? 0 : "-71px" }}
    >
      <NavLink className="d-flex aic ml30" to="/">
        <h1>DiscoverPlaces</h1>
      </NavLink>
      <ul className="d-flex mr30 aic">
        <NavLink to="/topplaces">
          <li className="pr40 textdeconone">Top Places</li>
        </NavLink>
        <NavLink to="/allguides">
          <li className="pr40 textdeconone">Tous les guides</li>
        </NavLink>
        {user ? (
          <div className="d-flex aic">
            <li
              onClick={toggleDropdown}
              className="d-flex ffrn aic pr10 textdeconone"
            >
              <i className="fa-regular fa-user mr10 fs20"></i>
              {user.pseudo}
              {isOpen ? (
                <i className="fs12 ml6 fa-solid fa-chevron-up"></i>
              ) : (
                <i className="fs12 ml6 fa-solid fa-chevron-down"></i>
              )}
            </li>
            {isOpen && (
              <ul className={`${styles.togglebar}`}>
                <NavLink to="/profil">
                  <li>Profil</li>
                </NavLink>
                <NavLink
                  onClick={async () => {
                    await signout();
                    navigate("/login");
                  }}
                >
                  <li>Logout</li>
                </NavLink>
                {user.role === "admin" && (
                  <NavLink to="/manageuser">
                    <li>Admin</li>
                  </NavLink>
                )}
              </ul>
            )}
          </div>
        ) : (
          <div>
            {/* <h3>{message}</h3> */}
            <NavLink to="/login">
              <button className="m10 btnlogin">Login</button>
            </NavLink>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Header;
