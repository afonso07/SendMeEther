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
    web3: Web3;
  } | null>(null);

  const [referenceElement, setReferenceElement] = useState<any>(null);
  const [popperElement, setPopperElement] = useState<any>(null);
  const [arrowElement, setArrowElement] = useState<any>(null);
  const [inputRef, setInputRef] = useState<any>(null);

  const [etherInput, setEtherInput] = useState<string>("");

  const [etherClicked, setEtherClicked] = useState<boolean>(false);

  const _dev_account: string = "0x4cf9394F6A5F884B5A7Fc00490F9161A7a68F291";

  const regex_number: RegExp = /^\d+$/g;

  const DevAccount = (
    <div>
      <span>0x</span>
      <span>4cf9394F6A5F884B5A7Fc00490F9161A7a68F291</span>
    </div>
  );

  const transactionCallback = async (): Promise<void> => {
    if (!regex_number.test(etherInput)) {
      return;
    }
    await netConfig?.web3.eth.sendTransaction({
      to: _dev_account,
      from: netConfig.account,
      value: netConfig.web3.utils.toWei(etherInput, "ether"),
    });
  };

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
          web3: web3,
        }));
      }
    };
    providerCheck();

    inputRef?.focus();
    setEtherClicked(true);
  }, [inputRef]);

  return provider && netConfig?.is_main ? (
    <div
      className={css_styles.main}
      onKeyPress={(event) =>
        event.key == "Enter" ? transactionCallback() : null
      }
    >
      <div className={css_styles.title_container}>
        <div className={css_styles.title}>
          SendMe
          <span
            onClick={() => {
              setEtherClicked(true);
              inputRef.focus();
            }}
          >
            <input
              className={css_styles.input_style}
              onChange={(e) => setEtherInput(e.target.value)}
              style={{ width: `${etherInput?.length || 1}ch`, opacity: 0 }}
              ref={setInputRef}
            ></input>
            <span style={{ width: `${etherInput?.length || 1}ch` }}>
              {!(etherClicked && etherInput.length > 0) ? (
                <span className={css_styles.input_underscore}>_</span>
              ) : (
                etherInput
              )}
            </span>
          </span>
          <span>Ether</span>
        </div>
        <div
          className={css_styles.account_wrapper}
          ref={setReferenceElement}
          onClick={transactionCallback}
        >
          {DevAccount}
        </div>
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className={css_styles.tooltip_tooltip}
        >
          Click here to Send Ether!
          <div
            className={css_styles.tooltip_arrow}
            ref={setArrowElement}
            style={styles.arrow}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className={css_styles.main}>
      <div className={css_styles.title}>
        <div className={css_styles.unavailable}>
          Please install <span>MetaMask</span> and connect to the{" "}
          <span>Main Net!</span>
        </div>
      </div>
    </div>
  );
};

export default SendMeEther;
