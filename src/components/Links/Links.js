import React, { useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ALL_LINKS_ENDPOINT, SERVER_LINK } from "../../helpers/vars";
import { useAuth } from "../../hooks/useAuth";
import { useHttp } from "../../hooks/useHttp";
import { useMessage } from "../../hooks/useMessage";
import Loader from "../Loader/Loader";
import styles from "./Links.module.css";

const Links = ({ upd }) => {
  const [links, setLinks] = useState(null);

  const { request, error } = useHttp();

  const message = useMessage();

  useEffect(() => {
    message(error);
  }, [message, error]);

  const auth = useAuth(AuthContext);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${auth.jwtToken}`,
  };

  useEffect(() => {
    async function fetchData() {
      const response = await request(
        SERVER_LINK + ALL_LINKS_ENDPOINT,
        "GET",
        null,
        headers
      );
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
            <div className={styles.elementFrom}>
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
