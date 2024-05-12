// import dependencies
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// create the main function
const Navigation = () => {
  // setting up useNavigate
  const navigate = useNavigate();

  const logOut = () => {
    if (window.confirm("Yakin mau keluar?") === true) {
      Cookies.remove("isLogin");
      window.location.replace(`/`);
    } else {
    }
  };

  const [isLogin, setIsLogin] = useState();

  useEffect(() => {
    const getLogin = async () => {
      const logged = Cookies.get("isLogin");
      logged !== undefined ? setIsLogin(true) : setIsLogin(false);
    };
    getLogin();
  }, []);

  // display of the navbar
  return (
    <>
      <div className="navbar">
        <button onClick={() => navigate(`/`)} id="logo">
          PT. Solusi Edukasi Gemilang
        </button>
        <div className="tabs">
          {isLogin === true ? (
            <>
              <button onClick={() => navigate(`/books`)}>
                <i className="fas fa-book"></i> <span>Book</span>
              </button>
              <button onClick={() => navigate(`/invoices`)}>
                <i className="fas fa-list"></i> <span>Invoice</span>
              </button>
              <button onClick={() => navigate(`/quotations`)}>
                <i className="fas fa-stamp"></i> <span>Quotation</span>
              </button>
              <button onClick={() => navigate(`/orders`)}>
                <i className="fas fa-box"></i> <span>Order</span>
              </button>
              <button onClick={() => navigate(`/events`)}>
                <i className="fas fa-calendar-alt"></i> <span>Event</span>
              </button>
              <button onClick={() => navigate(`/posts`)}>
                <i className="fas fa-file-alt"></i> <span>Post</span>
              </button>
              <button onClick={logOut}>
                <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate(`/`)}>
                <i className="fas fa-home"></i> <span>Home</span>
              </button>
              <button onClick={() => navigate(`/admin-login`)}>
                <i className="fas fa-sign-in-alt"></i> <span>Login</span>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

// export the main function
export default Navigation;
