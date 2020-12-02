import React, { useState } from "react";
import styles from "./HomePage.module.css";
import CreateLink from "../../components/CreateLink";
import Links from "../../components/Links";

const HomePage = () => {
  const [updated, setUpdated] = useState(null);
  return (
    <div className={styles.container}>
      <CreateLink upd={setUpdated} />
      <Links upd={updated} />
    </div>
  );
};

export default HomePage;
