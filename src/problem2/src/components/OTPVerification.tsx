import { useState, useEffect } from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import OtpInput from "react-otp-input";

export default function OTPVerification({
  setOverallOTP,
  submitLoading,
}: {
  setOverallOTP: Function;
  submitLoading: boolean;
}) {
  const [phoneNo, setPhoneNo] = useState("");
  const [oTPInput, setOTPInput] = useState("");
  const [requestOTP, setRequestOTP] = useState(false);
  const [OTPDropdown, setOTPDropdown] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const TEMPOTP = "123456";

  useEffect(() => {
    if (requestOTP) {
      const intervalId = setInterval(() => {
        setCountdown((t) => t - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [requestOTP]);
  useEffect(() => {
    if (countdown === 0) {
      setRequestOTP(false);
      setCountdown(60);
    }
  }, [countdown]);

  useEffect(() => {
    if (oTPInput === TEMPOTP) {
      setOverallOTP(true);
    } else {
      setOverallOTP(false);
    }
  }, [oTPInput, setOverallOTP]);

  return (
    <div>
      <div className="otp-heading">OTP Verification</div>
      <div>
        <TextField
          required
          label="Enter your phone number"
          variant="standard"
          value={phoneNo}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "" || (Number.isInteger(+value) && +value > 0)) {
              setPhoneNo(value);
            }
          }}
          disabled={submitLoading}
          fullWidth
          sx={{ paddingBottom: "10px" }}
          InputProps={{
            endAdornment: (
              <Box
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                }}
              >
                <InputAdornment position="end">
                  <div>
                    {requestOTP ? (
                      `Resend OTP in ${countdown}s`
                    ) : (
                      <div
                        className="send-otp"
                        onClick={() => {
                          setRequestOTP(true);
                          setOTPDropdown(true);
                        }}
                      >
                        Send OTP
                      </div>
                    )}
                  </div>
                </InputAdornment>
              </Box>
            ),
          }}
        />
        <Box
          sx={{
            display: {
              sm: "none",
            },
            paddingBottom: "10px",
          }}
        >
          {requestOTP ? (
            "OTP sent"
          ) : (
            <div className="send-otp" onClick={() => setRequestOTP(true)}>
              Send OTP
            </div>
          )}
        </Box>
      </div>
      {OTPDropdown && (
        <div className="otp-container">
          <div className="otp-text">Enter OTP:</div>
          <div>
            <OtpInput
              value={oTPInput}
              onChange={(value: string) => setOTPInput(value)}
              numInputs={6}
              separator={<span>&nbsp;</span>}
              hasErrored={oTPInput !== TEMPOTP && oTPInput.length === 6}
              errorStyle={{ border: "1px solid red" }}
              isDisabled={submitLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
}
