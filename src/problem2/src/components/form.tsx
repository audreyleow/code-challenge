import { useState, useEffect } from "react";
import { TextField, Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import { ethers } from "ethers";
import OTPVerification from "./OTPVerification";

export default function Form() {
  const [ethAddress, setEthAddress] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [amount, setAmount] = useState("");
  const [verifiedOTP, setVerifiedOTP] = useState(true);
  const [allValid, setAllValid] = useState(true);
  const [sendTokens, setSendTokens] = useState(false);

  useEffect(() => {
    if (ethAddress !== "") {
      setIsValidAddress(ethers.isAddress(ethAddress));
    }
  }, [ethAddress]);

  useEffect(() => {
    if (isValidAddress && amount && verifiedOTP) {
      setAllValid(true);
    } else {
      setAllValid(false);
    }
  }, [amount, isValidAddress, verifiedOTP]);

  useEffect(() => {
    if (sendTokens) {
      const timer = setTimeout(() => setSendTokens(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [sendTokens]);

  return (
    <div className="form">
      <div className="heading">Fancy Form</div>
      <div>
        <TextField
          required
          label="ETH Address"
          variant="standard"
          value={ethAddress}
          onChange={(e) => setEthAddress(e.target.value)}
          error={!isValidAddress}
          disabled={sendTokens}
          fullWidth
          sx={{ paddingBottom: "10px" }}
          helperText={!isValidAddress ? "Not ETH network!" : " "}
        />
      </div>
      <div>
        <TextField
          required
          label="Amount"
          variant="standard"
          value={amount}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "" || (!isNaN(+value) && +value >= 0)) {
              setAmount(value);
            }
          }}
          disabled={sendTokens}
          fullWidth
          sx={{ paddingBottom: "15px" }}
        />
      </div>
      <OTPVerification
        setOverallOTP={setVerifiedOTP}
        submitLoading={sendTokens}
      />
      <Box sx={{ paddingTop: "20px" }}>
        <LoadingButton
          loading={sendTokens}
          startIcon={sendTokens && <SaveIcon />}
          endIcon={!sendTokens && <SendIcon />}
          variant="contained"
          onClick={() => setSendTokens(true)}
          disabled={!allValid}
        >
          Send Tokens
        </LoadingButton>
      </Box>
    </div>
  );
}
