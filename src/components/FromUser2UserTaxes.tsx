import { Fragment, FunctionComponent } from "react";
import { Form } from "react-bootstrap";
import styles from "./styles/FromUser2User.module.css";

interface FromUser2UserTaxesProps {
  taxes: string;
  value: string;
  setTaxes: (value: React.SetStateAction<string>) => void;
}

const FromUser2UserTaxes: FunctionComponent<FromUser2UserTaxesProps> = ({
  taxes,
  value,
  setTaxes,
}) => {
  return (
    <Fragment>
      <span className={styles.pretitle}>
        Taxes {taxes} % {"  "}
        {parseInt(value) > 0 && (
          <span>
            {"( + "} {(parseInt(value) * parseInt(taxes)) / 100} {" eth)"}
          </span>
        )}
      </span>{" "}
      <Form.Range
        onChange={(e) => {
          setTaxes(e.target.value);
        }}
        min={0}
        max={100}
        value={taxes}
        step={5}
        className={styles.range}
      />
    </Fragment>
  );
};

export default FromUser2UserTaxes;
