import React, { useState } from "react";
import style from "./Navbar.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { LinkItem } from "../../types/types";

const Navbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const { favourites } = useSelector((state: any) => state.favourites);

  const handleNavigation = (index: number, url: string) => {
    setActiveTab(index);
    navigate(url);
  };

  const links: LinkItem[] = [
    { url: "/", title: "Locations" },
    { url: "/favourites", title: "My Favorites" },
  ];

  return (
    <nav className={`${style.navbar}`}>
      <div className={`${style.navbarMenu}`}>
        {links.map((link, index) => (
          <p
            key={index}
            className={`${activeTab === index ? `${style.active}` : undefined}`}
            onClick={() => handleNavigation(index, link.url)}
          >
            {link.title} {link.title === "My Favorites" && (favourites.length > 0 ? <span><FaHeart style={{ color: "red" }}/> <sup style={{ fontSize:"14px", color:"#000"}}>{favourites.length } </sup></span> : <FaRegHeart/>)}
          </p>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
