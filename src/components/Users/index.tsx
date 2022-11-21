import { ArrowLeft, Google } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useContext, useState } from "react";
import GlobalContext from "../../context";
import { validateEmail } from "../../helpers/validateEmail";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Link } from "react-router-dom";
import useApi from "../../api";

export interface IFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  _id?: string;
}

const Users = () => {
  const { setToaster } = useContext(GlobalContext);

  const { userSignin, userSignup } = useApi();

  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState<IFormData>({
    password: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const handleChange = (field: string, value: string, validator1?: string, validator2?: string) => {
    if (formErrors.includes(field)) {
      setFormErrors(formErrors.filter((item) => item !== field));
    }
    if (formErrors.includes(validator1 as string)) {
      setFormErrors(formErrors.filter((item) => item !== validator1));
    }
    if (formErrors.includes(validator2 as string)) {
      setFormErrors(formErrors.filter((item) => item !== validator2));
    }
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    if (isSignIn) {
      const errors = [];
      if (!formData.email) {
        errors.push("email2");
      } else {
        if (!validateEmail(formData.email)) {
          errors.push("emailInvalid");
        }
      }
      if (!formData.password) {
        errors.push("password2");
      } else {
        if (formData.password.length < 6) {
          errors.push("passwordInvalid");
        }
      }
      setFormErrors(errors);
      if (errors.length) {
        setToaster({
          severity: "error",
          show: true,
          message: "Please fill all the required fields.",
        });
        return;
      }

      userSignin({
        payload: { email: formData.email, password: formData.password },
      });
      return;
    }
    const errors = [];
    if (!formData.email) {
      errors.push("email");
    } else {
      if (!validateEmail(formData.email)) {
        errors.push("emailInvalid2");
      }
    }
    if (!formData.password) {
      errors.push("password");
    } else {
      if (formData.password.length < 6) {
        errors.push("passwordInvalid2");
      }
    }
    if (!formData.confirmPassword) {
      errors.push("confirmPassword");
    } else {
      if (formData.password !== formData.confirmPassword) {
        errors.push("InvalidconfirmPassword");
      }
    }
    if (!formData.lastName) {
      errors.push("lastName");
    } else {
      if (formData.lastName.length < 2) {
        errors.push("invalidlastName");
      }
    }
    if (!formData.firstName) {
      errors.push("firstName");
    } else {
      if (formData.firstName.length < 2) {
        errors.push("invalidFirstName");
      }
    }
    setFormErrors(errors);
    if (errors.length) {
      setToaster({
        severity: "error",
        show: true,
        message: "Please fill all the required fields.",
      });
      return;
    }

    userSignup({
      payload: {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword as string,
        firstName: formData.firstName as string,
        lastName: formData.lastName as string,
      },
    });
  };
  async function handleGoogleLoginSuccess(tokenResponse: any) {
    const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${tokenResponse.access_token}`,
      },
    });

    console.log(res);
    const accessToken = tokenResponse.access_token;
    if (isSignIn) {
      userSignin({ accessToken });
      return;
    }
    userSignup({ accessToken });
  }

  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" width="100%">
      <Box
        sx={{
          maxWidth: "500px",
          border: "1px solid maroon",
          borderTop: "5px solid maroon",
          borderBottom: "5px solid maroon",
          p: { xs: 2, sm: 5 },
        }}
      >
        {" "}
        <Link
          to="/"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "white",
            borderRadius: 4,
            border: "1px solid maroon",
            width: 20,
            height: 20,
            marginBottom: 4,
          }}
        >
          <ArrowLeft color="error" />
        </Link>
        <Stack width="100%" spacing={3}>
          <Box sx={{ fontWeight: 500 }}>Login to your account</Box>
          {isSignIn ? (
            <SignInForm
              formData={formData}
              setFormData={setFormData}
              setFormErrors={setFormErrors}
              formErrors={formErrors}
              handleChange={handleChange}
            />
          ) : (
            <SignUpForm
              formData={formData}
              setFormData={setFormData}
              setFormErrors={setFormErrors}
              formErrors={formErrors}
              handleChange={handleChange}
            />
          )}
          <Button variant="contained" color="error" onClick={handleSubmit}>
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>

          <Button variant="outlined" color="error" onClick={() => login()}>
            <Google /> oogle Sign {isSignIn ? "In" : "Up"}
          </Button>

          {isSignIn ? (
            <Box fontSize={14}>
              Don't have an account?{" "}
              <span style={{ color: "maroon", cursor: "pointer" }} onClick={() => setIsSignIn(!isSignIn)}>
                Bite me
              </span>{" "}
              😈
            </Box>
          ) : (
            <Box fontSize={14}>
              Already have an one?{" "}
              <span style={{ color: "maroon", cursor: "pointer" }} onClick={() => setIsSignIn(!isSignIn)}>
                Bite me
              </span>{" "}
              😈
            </Box>
          )}
        </Stack>
      </Box>
    </Stack>
  );
};

export default Users;
