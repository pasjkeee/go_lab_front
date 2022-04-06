import { FunctionComponent } from "react";
import CommonStatistic from "./CommonStatistic";
import PersonalStatistic from "./PersonalStatistic";
import styles from "./styles/NavBar.module.css"

const NavBar: FunctionComponent = () => {

  const publicUrl = process.env.PUBLIC_URL

  return (
    <div className={styles.container}>
      <img className={styles.icon} src={publicUrl + "logo192.png"} alt="icon">

      </img>
      <div className={styles.menuContainer}>
        <div className={`${styles.menuContainerItem} ${styles.choosed}`}>
          <img src={process.env.PUBLIC_URL + "stat.svg"} alt="stat"></img>
        </div>
        <div className={styles.menuContainerItem}>
          <img src={process.env.PUBLIC_URL + "maps.svg"} alt="stat"></img>
        </div>
        <div className={styles.menuContainerItem}>
          <img src={process.env.PUBLIC_URL + "shop.svg"} alt="stat"></img>
        </div>
        <div className={styles.menuContainerItem}>
          <img src={process.env.PUBLIC_URL + "messages.svg"} alt="stat"></img>
        </div>
        <div className={styles.menuContainerItem}>
          <img src={process.env.PUBLIC_URL + "files.svg"} alt="stat"></img>
        </div>
        <div className={styles.menuContainerItem}>
          <img src={process.env.PUBLIC_URL + "settings.svg"} alt="stat"></img>
        </div>
      </div>
      <img className={styles.footerPlus} src={publicUrl + "add.svg"} alt="add"></img>
    </div>
  );
};

export default NavBar;
