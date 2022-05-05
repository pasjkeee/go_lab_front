import { Dispatch, FunctionComponent } from "react";
import { ResultUsers } from "../service/userService";
import CommonStatisticUsers from "./CommonStatisticUsers";
import FromUser2User from "./FromUser2User";
import Pdf from "./Pdf";
import styles from "./styles/CommonStatistic.module.css";

interface CommonStatisticProps {
  setChoosedUser: Dispatch<React.SetStateAction<ResultUsers | null>>;
}

const CommonStatistic: FunctionComponent<CommonStatisticProps> = ({
  setChoosedUser,
}) => (
  <div className={styles.container}>
    <div className={styles.title}>Admin Dashboard</div>
    <div className={styles.cardContainer}>
      <CommonStatisticUsers setChoosedUser={setChoosedUser} />
      <FromUser2User />
    </div>
  </div>
);

export default CommonStatistic;
