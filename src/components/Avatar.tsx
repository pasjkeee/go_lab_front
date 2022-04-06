import { FunctionComponent } from "react";
import styles from "./styles/CommonStatisticUsers.module.css";

interface AvatarProps {
  letter: string;
}

const Avatar: FunctionComponent<AvatarProps> = ({ letter }) => (
  <div className={styles.letter}>{letter}</div>
);

export default Avatar;
