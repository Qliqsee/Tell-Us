/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Stack, TextField } from "@mui/material";
import { styles } from "../common/global.style";
import { Cancel, TaskAlt } from "@mui/icons-material";
import { useWindowSize } from "../../hooks/useWindowSize";
import { FileWithPath, useDropzone } from "react-dropzone";
import GlobalContext from "../../context";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
}

interface FormValues {
  title: string;
  tag: string;
  message: string;
  image?: FileWithPath;
}

export default function CreatePost({ setOpen, open, id }: Props) {
  const windowSize = useWindowSize();

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: (windowSize.width as number) < 310 ? 250 : (windowSize.width as number) < 500 ? 300 : 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: { xs: 2, sm: 4 },
  };
  const { setToaster } = React.useContext(GlobalContext);

  const handleClose = () => setOpen(false);

  const [formData, setFormData] = React.useState<FormValues>({
    title: "",
    tag: "",
    message: "",
  });
  const [formErrors, setFormErrors] = React.useState<string[]>([]);

  const handleChange = (field: string, value: string, validator1?: string) => {
    if (formErrors.includes(field)) {
      setFormErrors(formErrors.filter((item) => item !== field));
    }
    if (formErrors.includes(validator1 as string)) {
      setFormErrors(formErrors.filter((item) => item !== validator1));
    }
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const reader = new FileReader();

  const handleSubmit = () => {
    const errors = [];
    if (!formData.title) {
      errors.push("title");
    } else {
      if (formData.title.length < 3) {
        errors.push("titleInvalid");
      }
    }
    if (!formData.message) {
      errors.push("message");
    } else {
      if (formData.message.length < 20) {
        errors.push("messageInvalid");
      }
    }
    if (!formData.image) {
      errors.push("image");
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

    setToaster({
      severity: "success",
      show: true,
      message: "Welcome back!",
    });
    return;
  };

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
    },
  });

  React.useEffect(() => {
    if (formErrors.includes("image")) {
      setFormErrors(formErrors.filter((item) => item !== "image"));
    }
    if (!acceptedFiles.length) return;
    setFormData({
      ...formData,
      image: acceptedFiles[0],
    });
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result;
      console.log(binaryStr);
    };
    console.log(reader.readAsArrayBuffer(acceptedFiles[0]));
  }, [acceptedFiles]);

  // console.log(reader.readAsArrayBuffer(acceptedFiles[0]));

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ border: "1px solid maroon" }}
    >
      <Box sx={style}>
        <Box sx={{ fontSize: 22, color: "maroon", fontWeight: 500, mb: 3 }}>New Post</Box>
        <Stack direction="column" spacing={2}>
          <Box>
            <TextField
              onChange={(e) => handleChange("title", e.target.value, "titleInvalid")}
              fullWidth
              name="title"
              size="small"
              label="Title"
              value={formData.title}
            />
            <Box sx={styles.error}>
              {formErrors.includes("title")
                ? "Title is required"
                : formErrors.includes("titleInvalid")
                ? "Title is too short"
                : ""}
            </Box>
          </Box>
          <Box>
            <TextField
              onChange={(e) => handleChange("tag", e.target.value)}
              fullWidth
              name="tag"
              size="small"
              label="Tag"
              value={formData.tag}
            />
            <Box sx={styles.error}>{formErrors.includes("tag") && "Tag is too short"}</Box>
          </Box>
          <Box>
            <TextField
              onChange={(e) => handleChange("message", e.target.value, "messageInvalid")}
              fullWidth
              multiline
              rows={4}
              name="message"
              size="small"
              placeholder="Description"
              value={formData.message}
            />
            <Box sx={styles.error}>
              {formErrors.includes("message")
                ? "Description is required"
                : formErrors.includes("messageInvalid")
                ? "Description is too short"
                : ""}
            </Box>
          </Box>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
              <>
                {" "}
                <Stack
                  sx={{
                    background: "maroon",

                    p: 2,
                    borderRadius: 2,
                  }}
                >
                  <Box
                    sx={{
                      background: "white",
                      color: "maroon",
                      textAlign: "center",
                      borderRadius: 2,
                      py: 2,
                      border: "2px dotted maroon",
                    }}
                  >
                    Drag 'n drop 😎
                  </Box>
                  <Box
                    sx={{
                      color: "white",
                      fontWeight: 600,
                      fontSize: 12,
                      mt: 1,
                    }}
                  >
                    {formData.image && (
                      <span>
                        {" "}
                        {formData.image?.name} - {formData.image?.size} bytes
                      </span>
                    )}
                  </Box>
                </Stack>
                <Box sx={styles.error}>{formErrors.includes("image") && "Please upload an image"}</Box>
              </>
            }
          </div>
        </Stack>

        <Stack direction="row" justifyContent="center" mt={3} spacing={2}>
          <Button startIcon={<Cancel />} variant="outlined" onClick={() => setOpen(false)} size="small" color="error">
            Cancel
          </Button>
          <Button startIcon={<TaskAlt />} variant="contained" onClick={handleSubmit} size="small" color="error">
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
