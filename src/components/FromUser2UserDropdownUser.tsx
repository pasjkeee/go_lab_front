import { FunctionComponent } from "react";
import { Dropdown } from "react-bootstrap";
import { ResultUsers } from "../service/userService";
import styles from "./styles/FromUser2User.module.css";

interface FromUser2UserDropdownUserProps {
  users: ResultUsers[] | null;
  userFrom: number | undefined;
  setUserFrom: (value: React.SetStateAction<number | undefined>) => void;
}

const FromUser2UserDropdownUser: FunctionComponent<
  FromUser2UserDropdownUserProps
> = ({ users, userFrom, setUserFrom }) => {
  return (
    users && (
      <Dropdown className={styles.dropdown}>
        <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
          {users.find((user) => user.Id === userFrom)?.Login ?? "Отправитель"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {users.map((user) => (
            <Dropdown.Item
              onClick={() => {
                setUserFrom(user.Id);
              }}
            >
              {user.Login}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    )
  );
};

export default FromUser2UserDropdownUser;
