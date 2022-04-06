import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FormDataContext } from "../context/createContext";
import { AuthDataContext } from "../providers/authProvider";
import { fetchWallets, UserWallets } from "../service/userService";
import {
  userPayment,
  UserPaymentRequestBody,
} from "../service/walletPaymentService";
import FromUser2UserDropdownUser from "./FromUser2UserDropdownUser";
import FromUser2UserDropdownWallet from "./FromUser2UserDropdownWallet";
import FromUser2UserTaxes from "./FromUser2UserTaxes";
import styles from "./styles/FromUser2User.module.css";

const FromUser2User = () => {
  const users = useContext(FormDataContext);
  const dataAuth = useContext(AuthDataContext);

  const [value, setValue] = useState<string>("0");

  const [userFrom, setUserFrom] = useState<number | undefined>(undefined);
  const [userTo, setUserTo] = useState<number | undefined>(undefined);

  const [taxes, setTaxes] = useState<string>("0");

  const [walletsFrom, setWalletsFrom] = useState<UserWallets[] | null>(null);
  const [walletsTo, setWalletsTo] = useState<UserWallets[] | null>(null);

  const [choosedWalletFrom, setChoosedWalletFrom] =
    useState<UserWallets | null>(null);
  const [choosedWalletTo, setChoosedWalletTo] = useState<UserWallets | null>(
    null
  );
  const token = axios.CancelToken.source();

  useEffect(() => {
    userFrom &&
      fetchWallets(token.token, userFrom, dataAuth.authHeader).then((data) =>
        setWalletsFrom(data)
      );
    setChoosedWalletFrom(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFrom]);

  useEffect(() => {
    userTo &&
      fetchWallets(token.token, userTo, dataAuth.authHeader).then((data) =>
        setWalletsTo(data)
      );
    setChoosedWalletTo(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTo]);

  const handleSendData = () => {
    if (
      userFrom &&
      choosedWalletFrom?.id &&
      choosedWalletTo?.id &&
      value &&
      taxes
    ) {
      const data: UserPaymentRequestBody = {
        user_id: userFrom,
        sender_wallet_id: choosedWalletFrom.id,
        receiver_wallet_id: choosedWalletTo.id,
        payment_value: parseInt(value),
        taxes: parseInt(taxes),
      };
      userPayment(data, token.token, dataAuth.authHeader).then((status) => {
        if (status === 200) {
          setUserFrom(undefined);
          setUserTo(undefined);
        }
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Payment From User To User</div>
      <div className={styles.payContainer}>
        <div className={styles.walletContainer}>
          <div className={styles.wallet}>
            <span className={styles.pretitle}>From:</span>{" "}
            <FromUser2UserDropdownUser
              users={users}
              userFrom={userFrom}
              setUserFrom={setUserFrom}
            />
          </div>
          <FromUser2UserDropdownWallet
            wallets={walletsFrom}
            choosedWallet={choosedWalletFrom}
            setChoosedWallet={setChoosedWalletFrom}
          />
        </div>
        <div className={styles.walletContainer}>
          <div className={styles.wallet}>
            <span className={styles.pretitle}>To:</span>{" "}
            <FromUser2UserDropdownUser
              users={users}
              userFrom={userTo}
              setUserFrom={setUserTo}
            />
          </div>
          {walletsTo && (
            <div className={styles.wallet}>
              <span className={styles.pretitle}>To Wallet:</span>{" "}
              <FromUser2UserDropdownWallet
                wallets={walletsTo}
                choosedWallet={choosedWalletTo}
                setChoosedWallet={setChoosedWalletTo}
              />
            </div>
          )}
        </div>
        <span className={styles.pretitle}>Value</span>{" "}
        <Form.Control
          className={styles.range}
          type="input"
          placeholder="Введите сумму"
          value={value}
          onChange={(e) => {
            setValue(e.target.value.replace(/\D/g, ""));
          }}
        />
        <FromUser2UserTaxes taxes={taxes} value={value} setTaxes={setTaxes} />
        <Button
          variant="outline-success"
          className={styles.button}
          disabled={!(choosedWalletFrom?.id && choosedWalletTo?.id)}
          onClick={() => {
            handleSendData();
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default FromUser2User;
