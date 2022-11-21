import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { IFormData } from ".";
import { styles } from "./index.style";

export interface Props {
  setFormErrors: Dispatch<SetStateAction<Array<string>>>;
  formErrors: string[];
  setFormData: Dispatch<SetStateAction<IFormData>>;
  formData: IFormData;
  handleChange: (
    field: string,
    value: string,
    validator1?: string,
    validator2?: string
  ) => void;
}

const Form = ({
  setFormData,
  formData,
  setFormErrors,
  formErrors,
  handleChange,
}: Props) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Stack direction="column" spacing={2}>
      <Box>
        <TextField
          onChange={(e) =>
            handleChange("email", e.target.value, "email2", "emailInvalid")
          }
          fullWidth
          name="email"
          size="small"
          placeholder="Email"
          value={formData.email}
        />
        <Box sx={styles.error}>
          {formErrors.includes("email2")
            ? "Email is required"
            : formErrors.includes("emailInvalid")
            ? "Invalid Email"
            : ""}
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
            onChange={(e) =>
              handleChange(
                "password",
                e.target.value,
                "password2",
                "passwordInvalid"
              )
            }
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
          {formErrors.includes("password2")
            ? "Password is required"
            : formErrors.includes("passwordInvalid")
            ? "Password is too short"
            : ""}
        </Box>
      </Box>
    </Stack>
  );
};

export default Form;
