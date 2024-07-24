import { SearchAndCopy } from "../components/landing/SearchAndCopy";
import { CertifiedHistory } from "../components/landing/CertifiedHistory";

import "../styles/scss/general.scss";
import VideoPlayer from "../components/landing/VideoPlayer";
import Roadmap from "../components/Roadmap";
import Step from "../components/Step";
import { TheBrand } from "../components/landing/theBrand";
import { Footer } from "../components/landing/Footer";
import { Box } from "../components/MUI/MuiBox";
import NavebarGlass from "../components/NavebarGlass";
import { useState } from "react";
import PresaleElement from "../components/PresaleElement";
import { Hero2 } from "../components/landing/Hero2";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { useWeb3Modal, useWeb3ModalState } from "@web3modal/ethers/react";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract, formatUnits, getAddress } from "ethers";
import { Container } from "@mui/material";
import TestScroll from "../components/testScroll";

const projectId = "df8cb4fb25bd233a5125ccd99de3edcd";

// 2. Set chains
const mainnet = {
  chainId: 56,
  name: "BNB Smart Chain",
  currency: "BNB",
  explorerUrl: "https://bscscan.com/",
  rpcUrl: "https://bsc-dataseed.binance.org/",
};

// 3. Create a metadata object
const metadata = {
  name: "AStyle",
  description: "A Free Spirit",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

export const Presale = () => {
  return (
    <>
      <div style={{ position: "relative" }}>
        <NavebarGlass />
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Hero2 />
        </Container>
        <Footer></Footer>
      </div>
    </>
  );
};
