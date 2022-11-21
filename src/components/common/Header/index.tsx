import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Stack } from "@mui/system";
import { Avatar, Button, IconButton } from "@mui/material";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { Home, Login, PostAdd } from "@mui/icons-material";
import SearchField from "../../reusables";
import { Link } from "react-router-dom";
import CreatePost from "../../Posts/Create";

export default function Header() {
  const windowSize = useWindowSize();
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: "white" }}>
        <Toolbar>
          {(windowSize?.width as number) >= 600 && (
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ width: "100%" }}
            >
              <SearchField />

              <Stack direction="row" alignItems="center">
                <Link style={{ textDecoration: "none" }} to="/">
                  <IconButton>
                    <Home color="error" />
                  </IconButton>
                </Link>
                <Link style={{ textDecoration: "none" }} to="signin">
                  <IconButton>
                    <Login color="error" />
                  </IconButton>
                </Link>
                <Button
                  startIcon={<PostAdd />}
                  variant="contained"
                  color="error"
                  sx={{ mx: 1 }}
                  onClick={() => setOpen(!open)}
                >
                  Post
                </Button>
                <Avatar
                  sx={{
                    color: "maroon",
                    background: "transparent",
                    border: "1px solid maroon",
                  }}
                >
                  I
                </Avatar>
              </Stack>
            </Stack>
          )}
          {(windowSize?.width as number) < 600 && (
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ width: "100%" }}
            >
              <Stack
                direction="row"
                justifyContent="flex-end"
                sx={{ width: "100%" }}
                alignItems="center"
              >
                <Link style={{ textDecoration: "none" }} to="/">
                  <IconButton>
                    <Home color="error" />
                  </IconButton>
                </Link>
                <Link style={{ textDecoration: "none" }} to="signin">
                  <IconButton>
                    <Login color="error" />
                  </IconButton>
                </Link>
                <Button
                  size="small"
                  variant="contained"
                  disableElevation
                  color="error"
                  startIcon={<PostAdd />}
                  sx={{ fontSize: 12, mx: 1 }}
                  onClick={() => setOpen(!open)}
                >
                  Post
                </Button>
                <Avatar
                  sx={{
                    color: "maroon",
                    background: "transparent",
                    border: "1px solid maroon",
                  }}
                >
                  I
                </Avatar>
              </Stack>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
      <CreatePost open={open} setOpen={setOpen} />
    </Box>
  );
}
