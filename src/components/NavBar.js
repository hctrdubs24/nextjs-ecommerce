import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import Cookie from "js-cookie";

function NavBar() {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;

  const isActive = (r) => {
    if (r === router.pathname) {
      return " active";
    } else {
      return "";
    }
  };

  const handleLogout = () => {
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");
    dispatch({ type: "AUTH", payload: {} });
    dispatch({ type: "NOTIFY", payload: { success: "Logged out!" } });
    return router.push("/");
  };

  const adminRouter = () => {
    return (
      <>
        <Link href="/users">
          <a className="dropdown-item">Usuarios</a>
        </Link>
        <Link href="/create">
          <a className="dropdown-item">Productos</a>
        </Link>
        <Link href="/categories">
          <a className="dropdown-item">categorías</a>
        </Link>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={auth.user.avatar}
              alt={auth.user.avatar}
              style={{
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                transform: "translateY(-3px)",
                marginRight: "3px",
              }}
            />{" "}
            {auth.user.name}
          </a>
          <ul className="dropdown-menu dropdown-menu-dark">
            <Link href="/profile">
              <a className="dropdown-item">Perfil</a>
            </Link>
            {auth.user.role === "admin" && adminRouter()}
            <div className="dropdown-divider"></div>
            <button className="dropdown-item" onClick={handleLogout}>
              Salir
            </button>
          </ul>
        </li>
      </>
    );
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          <Link href={"/"}>
            <a className="navbar-brand ms-5">COPILOT PC</a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
              <li className="nav-item">
                <Link href="/cart">
                  <a className={"nav-link" + isActive("/cart")}>
                    <i
                      className="fas fa-shopping-cart position-relative"
                      aria-hidden="true"
                    >
                      <span
                        className="position-absolute"
                        style={{
                          padding: "3px 6px",
                          background: "#ed143dc2",
                          borderRadius: "50%",
                          top: "-10px",
                          right: "-10px",
                          color: "white",
                          fontSize: "14px",
                        }}
                      >
                        {cart.length}
                      </span>
                    </i>{" "}
                    Carrito
                  </a>
                </Link>
              </li>

              {Object.keys(auth).length === 0 ? (
                <li className="nav-item">
                  <Link href="/signin">
                    <a className={"nav-link" + isActive("/signin")}>
                      <i className="fas fa-user" aria-hidden="true"></i>
                      Ingresar
                    </a>
                  </Link>
                </li>
              ) : (
                loggedRouter()
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
