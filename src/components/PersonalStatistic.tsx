import axios from "axios";
import {
  Fragment,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button } from "react-bootstrap";
import { dateOptions } from "../constants/dateConstants";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  AuthDataContext,
  AuthDispatchContext,
} from "../providers/authProvider";
import { logOut } from "../service/commonService";
import {
  fetchWallets,
  fetchWalletTransactions,
  ResultUsers,
  UserWallets,
  WalletTransaction,
} from "../service/userService";
import styles from "./styles/PersonalStatistic.module.css";

interface PersonalStatisticProps {
  choosedUser: ResultUsers | null;
}

export const entities = ["eth", "nft"];

const parseDate = (date: string) => {
  return new Date(date).toLocaleString("ru", dateOptions);
};

const PersonalStatistic: FunctionComponent<PersonalStatisticProps> = ({
  choosedUser,
}) => {
  const token = axios.CancelToken.source();
  const [wallets, setWallets] = useState<UserWallets[] | null>(null);
  const [choosedWallet, setChoosedWallet] = useState<UserWallets | null>(null);
  const [walletTrasnsactions, setWalletTransactions] = useState<
    WalletTransaction[] | null
  >(null);
  const dispatch = useContext(AuthDispatchContext);
  const dataContext = useContext(AuthDataContext);

  useEffect(() => {
    setChoosedWallet(null);
    choosedUser?.Id &&
      fetchWallets(token.token, choosedUser.Id, dataContext.authHeader).then(
        (data) => {
          setWallets(data);
        }
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choosedUser?.Id]);

  useEffect(() => {
    setWalletTransactions(null);
    choosedWallet?.id &&
      fetchWalletTransactions(
        token.token,
        choosedWallet.id,
        dataContext.authHeader
      ).then((data) => setWalletTransactions(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choosedWallet?.id]);

  const { delAuth } = useLocalStorage();

  const handleLogOut = () => {
    logOut(dataContext.login, token.token, dataContext.authHeader).then(() => {
      dispatch && dispatch.setAuth(false);
    });
    delAuth();
  };

  return (
    <div className={styles.container}>
      <Button
        className={styles.btnTitle}
        variant="outline-secondary"
        onClick={() => {
          handleLogOut();
        }}
      >
        Log OUT
      </Button>
      <div className={styles.title}>Personal</div>
      <div className={styles.infoCard}>
        <div className={styles.titleCard}>Login</div>
        <div className={styles.valueCard}>{choosedUser?.Login}</div>
        <div className={styles.titleCard}>Email</div>
        <div className={styles.valueCard}>{choosedUser?.Email}</div>
        <div className={styles.titleCard}>Name</div>
        <div className={styles.valueCard}>{choosedUser?.Name}</div>
        <div className={styles.titleCard}>Surname</div>
        <div className={styles.valueCard}>{choosedUser?.Surname}</div>
      </div>
      {wallets && <div className={styles.title}>Wallets</div>}
      {wallets && (
        <div className={styles.walletContainer}>
          {wallets.map((walletItem) => (
            <div
              className={styles.wallet}
              onClick={() => {
                setChoosedWallet(walletItem);
              }}
            >
              <div className={styles.walletId}>
                <span className={styles.walletTitle}>Wallet ID</span>
                <span className={styles.walletValue}>{walletItem.id}</span>
              </div>
              <div className={styles.walletEth}>
                <span className={styles.walletTitle}>Etherium balance</span>
                <span className={styles.walletValue}>
                  {walletItem.eth_balance}
                </span>
              </div>
              <div className={styles.walletGas}>
                <span className={styles.walletTitle}>Gas Balanse</span>
                <span className={styles.walletValue}>
                  {" "}
                  {walletItem.gas_balance}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {walletTrasnsactions && <div className={styles.title}>Transactions</div>}
      {walletTrasnsactions && (
        <div className={styles.transactionsContainer}>
          <div className={styles.transactonTitle}>Trans Id</div>
          <div className={styles.transactonTitle}>Date</div>
          <div className={styles.transactonTitle}>Entity</div>
          {walletTrasnsactions.length ? (
            walletTrasnsactions.map((transaction) => (
              <Fragment>
                <div className={styles.transactonValue}>{transaction.id}</div>
                <div className={styles.transactonValue}>
                  {parseDate(transaction.date_time)}
                </div>
                <div className={styles.transactonValue}>
                  {entities[transaction.entity_id]}
                </div>
              </Fragment>
            ))
          ) : (
            <Fragment>
              <div className={styles.transactonValue}>no data</div>
              <div className={styles.transactonValue}>no data</div>
              <div className={styles.transactonValue}>no data</div>
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonalStatistic;
