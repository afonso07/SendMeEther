import React, { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import styles from "../styles/SendMeEther.module.css";

const SendMeEther = () => {
  const [provider, setProvider] = useState<any>(null);
  const [netConfig, setNetConfig] = useState<{
    is_main?: Boolean;
    account: string;
  } | null>(null);

  const DevAccount = "0x4cf9394F6A5F884B5A7Fc00490F9161A7a68F291";

  useEffect(() => {
    const providerCheck = async (): Promise<void> => {
      const provider: any = await detectEthereumProvider();
      setProvider(provider);

      if (provider) {
        const web3 = new Web3(provider);

        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });
        const networkType = await web3.eth.net.getNetworkType();
        setNetConfig((rest) => ({
          ...rest,
          is_main: networkType == "main",
          account: accounts[0],
        }));
      }
    };
    providerCheck();
  }, []);

  return provider && netConfig?.is_main ? (
    <div className={styles.main}>
      <div className={styles.title_container}>
        <div className={styles.title}>
          SendMe<span>Ether</span>
        </div>
        <div className={styles.account_wrapper}>{DevAccount}</div>
      </div>
    </div>
  ) : (
    <div>Please install MetaMask and connect to the Main Net!</div>
  );
};

export default SendMeEther;
