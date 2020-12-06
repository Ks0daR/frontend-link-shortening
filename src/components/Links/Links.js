import React, { useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";
import { useHttp } from "../../hooks/useHttp";
import Loader from "../Loader/Loader";
import styles from "./Links.module.css";

const Links = ({ upd }) => {
  const [links, setLinks] = useState(null);

  const { request, loading } = useHttp();

  const link = "https://backend-link.herokuapp.com/links/";
  const auth = useAuth(AuthContext);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${auth.jwtToken}`,
  };

  useEffect(() => {
    async function fetchData() {
      console.log(headers);
      const response = await request(link, "GET", null, headers);
      setLinks(response);
    }
    if (auth.jwtToken) {
      fetchData();
    }
  }, [auth.jwtToken, upd]);

  const changeStringLength = (str) => {
    if (str.length <= 50) {
      return str;
    }
    const newString = str.slice(0, 50) + "...";

    return newString;
  };

  const originalLink = (elem, newLink) =>
    (elem.currentTarget.textContent = newLink);

  return (
    <div className={styles.container}>
      {links ? (
        links.map((link) => (
          <div key={link.code} className={styles.card}>
            <div>
              <span className={styles.title}>Откуда: </span>
              <span onClick={(elem) => originalLink(elem, link.from)}>
                {changeStringLength(link.from)}
              </span>
            </div>
            <div>
              <span className={styles.title}>Короткая ссылка: </span>
              <a href={link.shortLink}>
                <span>{link.shortLink}</span>
              </a>
            </div>

            <span>Клики по ссылке: {link.clicks}</span>
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Links;
