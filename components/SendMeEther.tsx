import React, { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import css_styles from "../styles/SendMeEther.module.css";
import { usePopper } from "react-popper";

const SendMeEther = () => {
  const [provider, setProvider] = useState<any>(null);
  const [netConfig, setNetConfig] = useState<{
    is_main?: Boolean;
    account: string;
  } | null>(null);

  const [referenceElement, setReferenceElement] = useState<any>(null);
  const [popperElement, setPopperElement] = useState<any>(null);
  const [arrowElement, setArrowElement] = useState<any>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: "arrow", options: { element: arrowElement } },
      {
        name: "preventOverflow",
        options: {
          padding: 10,
        },
      },
      {
        name: "offset",
        options: {
          offset: [0, 7],
        },
      },
    ],
  });

  const DevAccount = (
    <div>
      <span>0x</span>
      <span>4cf9394F6A5F884B5A7Fc00490F9161A7a68F291</span>
    </div>
  );

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
    <div className={css_styles.main}>
      <div className={css_styles.title_container}>
        <div className={css_styles.title}>
          SendMe<span>Ether</span>
        </div>
        <div className={css_styles.account_wrapper} ref={setReferenceElement}>
          {DevAccount}
        </div>
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className={css_styles.tooltip_tooltip}
        >
          Click here to Send Ether!
          <div className={css_styles.tooltip_arrow} ref={setArrowElement} style={styles.arrow} />
        </div>
      </div>
    </div>
  ) : (
    <div>Please install MetaMask and connect to the Main Net!</div>
  );
};

export default SendMeEther;
