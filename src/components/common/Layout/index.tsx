import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IPropsWithChildren } from "../../../context";
import Header from "../Header";
import { Toaster } from "../Toaster";

const Layout = ({ children }: IPropsWithChildren) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") navigate("/posts");
  });

  return (
    <Box width="100%">
      {!location.pathname.includes("signin") && <Header />}
      <Toaster />
      <Box sx={{ py: 7, px: { xs: 1, sm: 7 } }}> {children}</Box>
    </Box>
  );
};

export default Layout;
