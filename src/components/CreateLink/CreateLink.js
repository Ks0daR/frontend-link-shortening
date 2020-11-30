import React, { useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import { useAuth } from "../../hooks/useAuth";
import { AuthContext } from "../../context/AuthContext";
import styles from "./CreateLink.module.css";

const CreateLink = () => {
  const { request } = useHttp();
  const auth = useAuth(AuthContext);

  const [link, setLink] = useState("");
  const [genLink, setShortLink] = useState("");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${auth.jwtToken}`,
  };

  const serverUrl = "https://backend-link.herokuapp.com/links/";
  const serverLink = JSON.stringify({ from: link });

  const handleInput = ({ target: { value } }) => {
    setLink(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await request(serverUrl, "POST", serverLink, headers);
      setShortLink(response);
    } catch (e) {}
    setLink("");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Создайте короткую ссылку!</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          <input
            className={styles.input}
            type="text"
            placeholder="Вставьте ссылку"
            value={link}
            onChange={handleInput}
          />
        </label>
        <button className={styles.button}>Сократить!</button>
      </form>
    </div>
  );
};

export default CreateLink;
