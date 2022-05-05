import { useContext } from "react";
import { SocketDataContext } from "../providers/socketProvider";
import styles from "./styles/Pdf.module.css";

const Pdf = () => {
  const { pdfData } = useContext(SocketDataContext);

  if (!pdfData?.length) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Payment From User To User</div>

      {pdfData?.map((dataItem) => (
        <div className={styles.card}>
          <span className={styles.id}>{dataItem["uuid"]}</span>
          <span className={styles.percent}>
            {dataItem["percent"] < 101 ? (
              dataItem["percent"] + " %"
            ) : (
              <span className={styles.done}>DONE</span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Pdf;
