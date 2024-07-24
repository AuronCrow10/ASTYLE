import { Box } from "../MUI/MuiBox";
import {
  Button,
  Grid,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Marquee from "react-fast-marquee";
import Stack from "@mui/material/Stack";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Countdown from "../Countdown";
import ProgressBar from "../progressbar";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useWeb3Modal, useWeb3ModalState } from "@web3modal/ethers/react";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import {
  BrowserProvider,
  Contract,
  formatUnits,
  getAddress,
  formatEther,
  parseEther,
} from "ethers";
import ABI from "../../util/ABI.json";
import ERC20ABI from "../../util/ERC20ABI.json";
import { ethers } from "ethers";

let tokens = ["BNB", "ETH", "USDT", "USDC"];

let string = "Connect Wallet";
let string2 = "Claim";
let string3 = "Buy";
const contractAddress = "0x317bA26a766F9E5860Ba00DfCcc228030C821D9d";

let tokenAddress = [
  "",
  "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
  "0x55d398326f99059fF775485246999027B3197955",
  "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
];

export const Hero2 = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { t } = useTranslation();
  const [token, setToken] = useState(0);
  const { isConnected, address } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();
  const { walletProvider } = useWeb3ModalProvider();
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [price, setPrice] = useState(0);
  const [endTime, setTime] = useState(0);
  const [hasLoaded, setLoaded] = useState(false);
  const [data, setData] = useState(0);
  const [isProfile, setProfile] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [claimTime, setClaim] = useState(0);
  const [toClaim, setToClaim] = useState(0);
  const [avail, setAvail] = useState(0);
  const [currPrice, setCurrPrice] = useState(0);
  const [clicked, setClick] = useState(false);
  const [ref, setRef] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [sold, setSold] = useState(0);
  const [max, setMax] = useState(0);
  const [perc, setPerc] = useState(0);

  const getQueryParams = (query) => {
    return query
      ? (/^[?#]/.test(query) ? query.slice(1) : query)
          .split("&")
          .reduce((params, param) => {
            let [key, value] = param.split("=");
            params[key] = value
              ? decodeURIComponent(value.replace(/\+/g, " "))
              : "";
            return params;
          }, {})
      : {};
  };
  useEffect(() => {
    const { param } = getQueryParams(window.location.search);
    if (param != undefined) {
      setData(param);
    }
  }, []);

  useEffect(() => {
    if (!hasLoaded) {
      connect();
    }
  }, []);

  if (isConnected && address && !profileLoaded) {
    string = address.slice(0, 4) + "..." + address.slice(36, 42);
    getProfile();
  }

  async function getProfile() {
    if (walletProvider) {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const myContract = new Contract(contractAddress, ABI, signer);
      const profile = await myContract.hasProfile(address);
      const claim = await myContract.nextClaimTime(address);
      const claimed = await myContract.claimed(address);
      const available = await myContract.amountToClaim(address);
      const isRef = await myContract.referralToId(address);
      setProfile(profile);
      setProfileLoaded(true);
      setClaim(Number(claim) - Math.round(Date.now() / 1000));
      setToClaim(Number(claimed));
      setAvail(Number(available));
      setRef("http://localhost:3000/presale?data=" + isRef);
    }
  }

  async function connect() {
    try {
      setLoaded(true);
      console.log("Loaded state set to true");

      const provider = new ethers.JsonRpcProvider(
        "https://fittest-skilled-hill.bsc.quiknode.pro/49ec3ceb82a607aa5ec732cc142e6d0c4ccadca9/"
      );
      console.log("Provider created:", provider);

      // The Contract object
      const myContract = new Contract(contractAddress, ABI, provider);
      console.log("Contract created:", myContract);

      const time = await myContract.roundEndTime();
      console.log("Round end time:", time);

      const currentPrice = await myContract.initPrice();
      console.log("Initial price:", currentPrice);

      const soldR = await myContract.soldPerRound();
      console.log("Sold per round:", soldR);

      const counter = await myContract.roundCounter();
      console.log("Round counter:", counter);

      const maxPerRound = await myContract.maxPerRound(counter);
      console.log("Max per round:", maxPerRound);

      setTime(Number(time) - Math.round(Date.now() / 1000));
      console.log("Time set:", Number(time) - Math.round(Date.now() / 1000));

      setCurrPrice(formatEther(currentPrice));
      console.log("Current price set:", formatEther(currentPrice));

      setSold(Number(soldR));
      console.log("Sold set:", Number(soldR));

      setMax(Number(maxPerRound));
      console.log("Max set:", Number(maxPerRound));

      if (soldR > 0) {
        let percent = (Number(soldR) / Number(maxPerRound)) * 100;
        setPerc(percent);
        console.log("Percentage set:", percent);
      }
    } catch (error) {
      console.error("Error in connect function:", error);
    }
  }

  async function claim() {
    const ethersProvider = new BrowserProvider(walletProvider);
    const signer = await ethersProvider.getSigner();
    const myContract = new Contract(contractAddress, ABI, signer);
    try {
      await (await myContract.claim()).wait();
      setTitle("Success!");
      setDesc("You have successfully claimed $A-Style tokens!");
      setOpen(true);
    } catch (error) {
      setTitle("Failure!");
      if (error.reason != undefined) {
        setDesc(error.reason);
      } else if (error.info.error.message != undefined) {
        if (error.info.error.message == "Internal JSON-RPC error.") {
          setDesc("Insufficient Balance!");
        } else {
          setDesc(error.info.error.message);
        }
      }
      setOpen(true);
    }
  }

  async function handleValueChange(e) {
    setValue(e.target.value);
    setLoading(true);
  }

  async function getPrice() {
    const provider = new ethers.JsonRpcProvider(
      "https://fittest-skilled-hill.bsc.quiknode.pro/49ec3ceb82a607aa5ec732cc142e6d0c4ccadca9/"
    );
    // The Contract object
    const myContract = new Contract(contractAddress, ABI, provider);
    try {
      const fprice = await myContract.calculatePrice(parseEther(value), token);
      setPrice(Number(fprice));
      setLoading(false);
    } catch (error) {
      setTitle("Failure!");
      setDesc("Amount must be greather than 0!");
      setOpen(true);
    }
  }

  function buy() {
    if (token == 0) {
      buyBNB();
    } else if (token > 0 && token <= 3) {
      buyToken(token);
    }
  }

  async function buyBNB() {
    if (walletProvider) {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const myContract = new Contract(contractAddress, ABI, signer);
      const ref = await myContract.idToReferral(data);
      try {
        await (
          await myContract.buyWithBNB(ref, {
            value: parseEther(value),
          })
        ).wait();
        setTitle("Success!");
        setDesc("You have successfully acquired $A-Style tokens!");
        setOpen(true);
        getProfile();
      } catch (error) {
        setTitle("Failure!");
        if (error.reason != undefined) {
          setDesc(error.reason);
        } else if (error.info.error.message != undefined) {
          if (error.info.error.message == "Internal JSON-RPC error.") {
            setDesc("Insufficient Balance!");
          } else {
            setDesc(error.info.error.message);
          }
        }
        setOpen(true);
      }
    } else {
      setTitle("Failure!");
      setDesc("You must connect your wallet first!");
      setOpen(true);
    }
  }

  async function buyToken(type) {
    if (walletProvider) {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const myContract = new Contract(contractAddress, ABI, signer);
      const contract = new Contract(tokenAddress[type], ERC20ABI, signer);
      const ref = await myContract.idToReferral(data);
      await (await contract.approve(contractAddress, parseEther(value))).wait();
      try {
        const result = await myContract.buyWithToken(
          parseEther(value),
          ref,
          type
        );
        result.wait();
        getProfile();
        setTitle("Success!");
        setDesc("You have successfully acquired $A-Style tokens!");
        setOpen(true);
      } catch (error) {
        setTitle("Failure!");
        if (error.reason != undefined) {
          setDesc(error.reason);
        } else if (error.info.error.message != undefined) {
          if (error.info.error.message == "Internal JSON-RPC error.") {
            setDesc("Insufficient Balance!");
          } else {
            setDesc(error.info.error.message);
          }
        }
        setOpen(true);
      }
    } else {
      setTitle("Failure!");
      setDesc("You must connect your wallet first!");
      setOpen(true);
    }
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setOpen(false)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">{desc}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          background: "transparent",
          position: "fixed",
          top: "64px",
          left: "0",
          right: "0",
          bottom: "50px",
          zIndex: "-999",
        }}
      >
        <Marquee
          autoFill
          gradient
          gradientColor="#000"
          speed={140}
          gradientWidth={50}
          style={{
            margin: "0",
            padding: "0",
          }}
        >
          <Typography className="theader">A-STYLE </Typography>
        </Marquee>
        <Marquee
          autoFill
          gradient
          gradientColor="#000"
          gradientWidth={50}
          speed={140}
          direction={"right"}
          style={{
            margin: "0",
            padding: "0",
          }}
        >
          <Typography className="theader">A-STYLE </Typography>
        </Marquee>
        <Marquee
          autoFill
          gradient
          gradientColor="#000"
          gradientWidth={50}
          speed={140}
          direction={"left"}
          style={{
            margin: "0",
            padding: "0",
          }}
        >
          <Typography className="theader">A-STYLE </Typography>
        </Marquee>
        <Marquee
          autoFill
          gradient
          gradientColor="#000"
          gradientWidth={50}
          speed={140}
          direction={"right"}
          style={{
            margin: "0",
            padding: "0",
          }}
        >
          <Typography className="theader">A-STYLE </Typography>
        </Marquee>
      </Box>

      <Box
        sx={{
          marginTop: "0",
          padding: window.innerWidth > 600 ? "6vh 0px " : "8vh 16px",
        }}
      >
        <Grid container spacing={0} direction="row">
          <Grid md={3} xs={0}></Grid>
          <Grid
            md={6}
            xs={12}
            sx={{
              padding: window.innerWidth > 600 ? "20px" : "0",
            }}
          >
            <img
              src="/AlogoComplete.png"
              style={{
                maxWidth: window.innerWidth > 600 ? "120px" : "100px",
                display: "none",
                margin:
                  window.innerWidth > 600 ? "8vh auto 0" : "-16px auto 24px",
              }}
            />

            <Box
              style={{
                background:
                  "radial-gradient(circle, rgba(250,172,0,1) 0%, rgba(212,146,0,1) 54%, rgba(161,110,0,1) 100%)",
                borderRadius: "6px",
                padding: "16px",
                marginTop: "40px",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {t("updateprice")}
              </Typography>
              <Typography
                sx={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                <Countdown initialSeconds={endTime} />
              </Typography>
            </Box>
            {/*

													<Typography
							mt={2}
							variant="h6"
							align="left"
							sx={{
								fontFamily: "Work Sans !important",
								fontWeight: "800",
								fontSize: window.innerWidth < 600 ? "32px" : "56px",
								marginTop: window.innerWidth < 600 ? "16px" : "80px",
							}}
						>
							A-Free Spirit
						</Typography>

							
													<Typography
														mt={2}
														variant="h6"
														align="left"
														sx={{
															fontFamily: "Work Sans !important",
															fontWeight: "300",
															fontSize: window.innerWidth < 600 ? "16px" : "18px",
														}}
													>
														{t("landing.certifiedHistory.text")}
													</Typography>
							
							*/}
            {isProfile ? (
              <div>
                {activeTab === 0 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      textTransform: "none",
                      margin: "24px 0 8px 0",
                      fontWeight: "600",
                      padding: "10px 60px",
                      borderRadius: "100px",
                      fontSize: "16px",
                      border: "2px solid #ffcd00",
                    }}
                    onClick={() => setActiveTab(1)}
                  >
                    Claim Token
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      textTransform: "none",
                      margin: "24px 0 8px 0",
                      fontWeight: "600",
                      padding: "10px 60px",
                      borderRadius: "100px",
                      fontSize: "16px",
                      border: "2px solid #ffcd00",
                    }}
                    onClick={() => setActiveTab(0)}
                  >
                    Presale
                  </Button>
                )}
              </div>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        <Grid container spacing={0} direction="row">
          <Grid md={3} xs={0} id="hero-text-container"></Grid>
          <Grid
            md={6}
            xs={12}
            id="hero-text-container"
            sx={{
              padding: window.innerWidth > 600 ? "20px" : "0",
            }}
          >
            <Box
              style={{
                backgroundColor: "#181818db",
                borderRadius: "6px",
                padding: "8px 20px",
                marginTop: "0",
                marginBottom: "40px",
              }}
            >
              <Box>
                <Typography
                  style={{
                    fontSize: "24px",
                    textAlign: "center",
                    fontWeight: "600",
                    margin: "20px auto 0px",
                  }}
                >
                  {t("buy")}
                </Typography>
                <Typography
                  style={{
                    padding: "24px 0 16px 0",
                    fontSize: "16px",
                    textAlign: "center",
                    fontWeight: "400",
                  }}
                >
                  $A-STYLE {t("sold")}:{" "}
                  <b>
                    {sold} / {max}
                  </b>
                </Typography>
                <ProgressBar percentage={perc} animationDuration={2000} />
                <Typography
                  style={{
                    padding: "16px 0 24px",
                    fontSize: "16px",
                    textAlign: "center",
                    fontWeight: "400",
                  }}
                >
                  1 $A-STYLE = <b>{currPrice}</b>
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="secondary"
                sx={{
                  textTransform: "none",
                  margin: "10px auto 20px",
                  fontWeight: "600",
                  padding: "10px 60px",
                  borderRadius: "100px",
                  fontSize: "16px",
                  display: "block",
                }}
                onClick={() => open()}
              >
                {string}
              </Button>

              <Stack
                direction="row"
                spacing={1}
                justifyContent="center"
                alignItems="center"
                sx={{
                  marginBottom: "32px !important",
                }}
                style={{
                  display: activeTab !== 0 ? "none" : "flex",
                }}
              >
                <Button
                  className={token === 0 ? "button active" : "button"}
                  onClick={(e) => {
                    setToken(0);
                    setLoading(true);
                    setPrice(0);
                  }}
                >
                  BNB
                </Button>
                <Button
                  className={token === 1 ? "button active" : "button"}
                  onClick={(e) => {
                    setToken(1);
                    setLoading(true);
                    setPrice(0);
                  }}
                >
                  ETH
                </Button>
                <Button
                  className={token === 2 ? "button active" : "button"}
                  onClick={(e) => {
                    setToken(2);
                    setLoading(true);
                    setPrice(0);
                  }}
                >
                  USDT
                </Button>
                <Button
                  className={token === 3 ? "button active" : "button"}
                  onClick={(e) => {
                    setToken(3);
                    setLoading(true);
                    setPrice(0);
                  }}
                >
                  USDC
                </Button>
              </Stack>

              {activeTab === 0 ? (
                <Stack spacing={2} justifyContent="center" alignItems="center">
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={
                      <InputAdornment position="end">
                        {tokens[token]}
                      </InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                    sx={{ width: "90%" }}
                    value={value}
                    placeholder="0"
                    onChange={(e) => handleValueChange(e)}
                    inputProps={{
                      "aria-label": "weight",
                      type: "text",
                    }}
                  />
                  <ArrowDownwardIcon sx={{ fontSize: "40px" }} />

                  <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={
                      <InputAdornment position="end">$A-STYLE</InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                    sx={{ width: "90%" }}
                    value={price}
                    inputProps={{
                      "aria-label": "weight",
                    }}
                  />

                  {!isLoading ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{
                        textTransform: "none",
                        margin: "24px auto 8px",
                        fontWeight: "600",
                        padding: "10px 60px",
                        borderRadius: "100px",
                        fontSize: "16px",
                        display: "block",
                      }}
                      onClick={() => buy()}
                    >
                      {t("buynow")}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{
                        textTransform: "none",
                        margin: "24px auto 32px !important",
                        fontWeight: "600",
                        padding: "10px 60px",
                        borderRadius: "100px",
                        fontSize: "16px",
                        display: "block",
                      }}
                      onClick={() => getPrice()}
                    >
                      {t("Preview Price")}
                    </Button>
                  )}
                </Stack>
              ) : (
                <Stack spacing={1} justifyContent="center" alignItems="center">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "80%",
                    }}
                  >
                    <h3>Purchased: </h3>
                    <h3>{avail}</h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "80%",
                    }}
                  >
                    <h3>Claimed: </h3>
                    <h3>{toClaim}</h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "0 10px 24px",
                      backgroundColor: "#ffcd00",
                      color: "#000",
                      borderRadius: "7px",
                      textAlign: "center",
                      width: "90%",
                    }}
                  >
                    <h4>Next Claim Available in:</h4>
                    <ArrowDownwardIcon sx={{ fontSize: "40px" }} />
                    <Countdown initialSeconds={claimTime} />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></div>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={(e) => claim()}
                    sx={{
                      textTransform: "none",
                      margin: "24px auto 28px !important",
                      fontWeight: "600",
                      padding: "10px 60px",
                      borderRadius: "100px",
                      fontSize: "16px",
                      display: "block",
                    }}
                  >
                    CLAIM
                  </Button>
                </Stack>
              )}
            </Box>
          </Grid>

          <Grid
            md={12}
            xs={12}
            id="hero-text-container"
            sx={{
              padding: window.innerWidth > 600 ? "20px" : "0",
            }}
          >
            {isProfile ? (
              <Box
                sx={{
                  border: "4px solid #FFCD00",
                  padding: "0 20px 20px",
                  backgroundColor: "#181818db",
                  borderRadius: "8px",
                }}
              >
                <Typography
                  mt={2}
                  variant="h6"
                  align="left"
                  sx={{
                    fontFamily: "Work Sans !important",
                    fontWeight: "800",
                    fontSize: window.innerWidth < 600 ? "24px" : "32px",
                  }}
                >
                  Referral
                </Typography>
                <Typography
                  mt={2}
                  variant="h6"
                  align="left"
                  sx={{
                    fontFamily: "Work Sans !important",
                    fontWeight: "300",
                    fontSize: window.innerWidth < 600 ? "16px" : "18px",
                    marginBottom: "16px",
                  }}
                >
                  {t("referral.text")}
                </Typography>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  aria-describedby="outlined-weight-helper-text"
                  sx={{ width: "100%" }}
                  value={ref}
                  inputProps={{
                    "aria-label": "weight",
                  }}
                />
              </Box>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
