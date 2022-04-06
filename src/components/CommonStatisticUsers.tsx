import axios from "axios";
import {
  Dispatch,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { FormDispatchContext } from "../context/createContext";
import { AuthDataContext } from "../providers/authProvider";
import { fetchUsers, ResultUsers } from "../service/userService";
import CommonStatisticUsersCardBody from "./CommonStatisticUsersBody";
import styles from "./styles/CommonStatisticUsers.module.css";

interface AvatarProps {
  letter: string;
}

const Avatar: FunctionComponent<AvatarProps> = (props) => (
  <div className={styles.letter}>{props.letter}</div>
);

interface CommonStatisticUsersProps {
  setChoosedUser: Dispatch<React.SetStateAction<ResultUsers | null>>;
}

const CommonStatisticUsers: FunctionComponent<CommonStatisticUsersProps> = (
  props
) => {
  const token = axios.CancelToken.source();
  const [users, setUsers] = useState<ResultUsers[] | null>(null);
  const dispatch = useContext(FormDispatchContext);
  const dataAuth = useContext(AuthDataContext);

  const getUsers = () => {
    fetchUsers(token.token, dataAuth.authHeader).then((res) => {
      setUsers(res);
      dispatch(res);
    });
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Users</div>
      <div className={styles.userContainer}>
        {users &&
          users.map((user) => (
            <div
              className={styles.card}
              onClick={() => {
                props.setChoosedUser(user);
              }}
            >
              <Avatar letter={user.Login[0]} />
              <CommonStatisticUsersCardBody user={user} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommonStatisticUsers;
