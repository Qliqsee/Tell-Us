import { Props } from "./SignInForm";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, FormControl, IconButton, InputAdornment, OutlinedInput, Stack, TextField } from "@mui/material";
import React from "react";
import { styles } from "./index.style";

const Form = ({ setFormData, formData, setFormErrors, formErrors, handleChange }: Props) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <Stack direction="column" spacing={2}>
      <Box>
        <TextField
          onChange={(e) => handleChange("firstName", e.target.value, "invalidFirstName")}
          fullWidth
          name="firstName"
          size="small"
          placeholder="First Name"
          value={formData.firstName}
        />
        <Box sx={styles.error}>
          {formErrors.includes("firstName")
            ? "First name is required"
            : formErrors.includes("invalidFirstName")
            ? "First name is too short"
            : ""}
        </Box>
      </Box>
      <Box>
        <TextField
          onChange={(e) => handleChange("lastName", e.target.value, "invalidlastName")}
          fullWidth
          name="lastName"
          size="small"
          placeholder="Last Name"
          value={formData.lastName}
        />
        <Box sx={styles.error}>
          {formErrors.includes("lastName")
            ? "Last name is required"
            : formErrors.includes("invalidlastName")
            ? "Last name is too short"
            : ""}
        </Box>
      </Box>
      <Box>
        <TextField
          onChange={(e) => handleChange("email", e.target.value, "emailInvalid2")}
          fullWidth
          name="email"
          size="small"
          placeholder="Email"
          value={formData.email}
        />
        <Box sx={styles.error}>
          {formErrors.includes("email") ? "Email is required" : formErrors.includes("emailInvalid2") ? "Invalid Email" : ""}
        </Box>
      </Box>
      <Box>
        <FormControl variant="outlined">
          <OutlinedInput
            fullWidth
            placeholder="Password"
            size="small"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value, "passwordInvalid2")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Box sx={styles.error}>
          {formErrors.includes("password")
            ? "Password is required"
            : formErrors.includes("passwordInvalid2")
            ? "Password is too short"
            : ""}
        </Box>
      </Box>
      <Box>
        <FormControl variant="outlined">
          <OutlinedInput
            fullWidth
            placeholder="Confirm Password"
            size="small"
            type={showPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value, "InvalidconfirmPassword")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Box sx={styles.error}>
          {formErrors.includes("confirmPassword")
            ? "Confirm Password is required"
            : formErrors.includes("InvalidconfirmPassword")
            ? "Passwords do not match"
            : ""}
        </Box>
      </Box>
    </Stack>
  );
};

export default Form;
