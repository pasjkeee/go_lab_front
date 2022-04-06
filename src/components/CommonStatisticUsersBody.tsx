import { FunctionComponent } from "react";
import { ResultUsers } from "../service/userService";
import styles from "./styles/CommonStatisticUsers.module.css";

interface CommonStatisticUsersCardBodyProps {
  user: ResultUsers;
}

const CommonStatisticUsersCardBody: FunctionComponent<
  CommonStatisticUsersCardBodyProps
> = ({ user }) => {
  return (
    <div className={styles.cardBody}>
      <div className={styles.cardTop}>
        <span>
          Login: <span className={styles.login}>{user.Login}</span>
        </span>
        <span>
          Email: <span className={styles.email}>{user.Email}</span>
        </span>
      </div>
      <div className={styles.cardBottom}>
        <span>
          Name: <span className={styles.name}>{user.Name}</span>
        </span>
        <span>
          Surname: <span className={styles.surname}>{user.Surname}</span>
        </span>
      </div>
    </div>
  );
};

export default CommonStatisticUsersCardBody;
