import { FunctionComponent, Fragment } from "react";
import { Dropdown } from "react-bootstrap";
import { UserWallets } from "../service/userService";
import styles from "./styles/FromUser2User.module.css";

export const makeBalanceItem = (wallet: UserWallets) => (
  <Fragment>
    Id:
    <span className={styles.dropDownItem}>{wallet.id}</span>
    Gath:
    <span className={styles.dropDownItem}>{wallet.gas_balance}</span>
    Eth:
    <span className={styles.dropDownItem}>{wallet.eth_balance}</span>
  </Fragment>
);

interface FromUser2UserDropdownWalletProps {
  wallets: UserWallets[] | null;
  choosedWallet: UserWallets | null;
  setChoosedWallet: (value: React.SetStateAction<UserWallets | null>) => void;
}

const FromUser2UserDropdownWallet: FunctionComponent<
  FromUser2UserDropdownWalletProps
> = ({ wallets, choosedWallet, setChoosedWallet }) => {
  return (
    wallets && (
      <div className={styles.wallet}>
        <span className={styles.pretitle}>From Wallet:</span>
        <Dropdown className={styles.dropdown}>
          <Dropdown.Toggle variant="outline-success" id="dropdown-bsic">
            {choosedWallet?.id
              ? makeBalanceItem(choosedWallet)
              : "Кошелек отправитель"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {wallets.map((wallet) => (
              <Dropdown.Item
                onClick={() => {
                  setChoosedWallet(wallet);
                }}
              >
                {makeBalanceItem(wallet)}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  );
};

export default FromUser2UserDropdownWallet;
