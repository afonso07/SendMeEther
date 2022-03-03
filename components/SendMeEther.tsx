import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import css_styles from "../styles/SendMeEther.module.css";
import { usePopper } from "react-popper";
import { TransactionReceipt } from "web3-core";

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
  const [etherFocused, setEtherFocused] = useState<boolean>(false);

  const titleRef = useRef(null);

  const _dev_account: string = "0x4cf9394F6A5F884B5A7Fc00490F9161A7a68F291";

  const regex_number: RegExp = /^([0-9]+\.?[0-9]*|\.[0-9]+)$/g;

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
    await netConfig?.web3.eth
      .sendTransaction({
        to: _dev_account,
        from: netConfig.account,
        value: netConfig.web3.utils.toWei(etherInput, "ether"),
      })
      .once("receipt", (reciept: TransactionReceipt) => {});
  };

  const popper_address = usePopper(referenceElement, popperElement, {
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

  useOutsideAlerter(titleRef, () => {
    setEtherFocused(false);
  });

  useLayoutEffect(() => {
    if (etherFocused == false) {
      popper_address.update ? popper_address.update() : null;
    }
  }, [etherFocused == false]);

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

        if (accounts[0]) {
        }
      }
    };
    console.log("Hmmmm... What are you doing here? Just send some ETH!");

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
        <div
          className={css_styles.title}
          onClick={() => {
            setEtherClicked(true);
            inputRef.focus();
            popper_address.update ? popper_address.update() : null;
          }}
          ref={titleRef}
        >
          SendMe
          <span>
            <input
              className={css_styles.input_style}
              onChange={(e) => {
                setEtherInput(e.target.value);
                popper_address.update ? popper_address.update() : null;
              }}
              style={{ width: `${etherInput?.length || 1}ch`, opacity: 0 }}
              ref={setInputRef}
              onFocus={() => {
                setEtherFocused(true);
              }}
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
        {!etherFocused ? (
          <div className={css_styles.subtitle}>Click above to start typing</div>
        ) : !etherInput ? (
          <div className={css_styles.subtitle}>Start typing!</div>
        ) : null}
        <div
          className={css_styles.account_wrapper}
          ref={setReferenceElement}
          onClick={transactionCallback}
        >
          {DevAccount}
        </div>
        <div
          ref={setPopperElement}
          style={popper_address.styles.popper}
          {...popper_address.attributes.popper}
          className={css_styles.tooltip_tooltip}
        >
          Click here to Send Ether!
          <div
            className={css_styles.tooltip_arrow}
            ref={setArrowElement}
            style={popper_address.styles.arrow}
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

// ? Hook that detects outside clicks
function useOutsideAlerter(ref: any, stateChange: () => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target)) {
        stateChange();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default SendMeEther;
