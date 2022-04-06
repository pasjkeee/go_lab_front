import { FunctionComponent, useState } from "react";
import { FormDataContext, FormDispatchContext } from "../context/createContext";
import { ResultUsers } from "../service/userService";
import CommonStatistic from "./CommonStatistic";
import NavBar from "./NavBar";
import PersonalStatistic from "./PersonalStatistic";
import styles from "./styles/NftMain.module.css";

const NftMain: FunctionComponent = () => {
  const [choosedUser, setChoosedUser] = useState<ResultUsers | null>(null);
  const [users, setUsers] = useState<ResultUsers[] | null>(null);

  return (
    <FormDataContext.Provider value={users}>
      <FormDispatchContext.Provider value={setUsers}>
        <div className={styles.container}>
          <NavBar />
          <CommonStatistic setChoosedUser={setChoosedUser} />
          <PersonalStatistic choosedUser={choosedUser} />
        </div>
      </FormDispatchContext.Provider>
    </FormDataContext.Provider>
  );
};

export default NftMain;
