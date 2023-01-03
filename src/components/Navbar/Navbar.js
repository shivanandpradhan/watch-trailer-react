import navImg from "../../nav.png";
import "./Navbar.css";
import React, { useState, useEffect } from "react";

function Navbar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 100 ? setShow(true) : setShow(false);
    });

    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`navbar ${show && "nav-background"}`}>
      <img className="logo" src={navImg} alt="WatchMovie" />
    </div>
  );
}

export default Navbar;
