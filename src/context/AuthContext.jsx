import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");
    const lastPath = localStorage.getItem("lastPath");
    console.log("lastPath", lastPath);

    if (token && userId) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          localStorage.removeItem("id");
          delete axios.defaults.headers.common["Authorization"];
          setIsAuthenticated(false);
          setUser(null);
          navigate("/", { replace: true });
        } else {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setIsAuthenticated(true);
          setUser({ id: userId });

          if (location.pathname === "/") {
            navigate("/chatPage", { replace: true });
          }
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        setIsAuthenticated(false);
        setUser(null);
        navigate("/", { replace: true });
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate]);

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("id", userData.user.id);
    axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
    setIsAuthenticated(true);
    setUser(userData.user);
    navigate("/chatPage");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    delete axios.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("lastPath", location.pathname);
    }
  }, [location.pathname, isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      <Outlet />
    </AuthContext.Provider>
  );
};

const useAuthProvider = () => useContext(AuthContext);

export { AuthProvider, useAuthProvider };
