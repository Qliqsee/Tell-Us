import { Avatar, Button, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import moment from "moment";
import React from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import SearchField from "../reusables";

const Post = () => {
  const windowSize = useWindowSize();

  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{ width: "100%" }}
      px={{ xs: 1, md: 10 }}
    >
      <Stack
        direction="column"
        alignItems="flex-start"
        sx={{ width: { md: 960, sm: "100%" } }}
      >
        <Stack direction="row" justifyContent="flex-end" width="100%">
          {(windowSize.width as number) < 600 && (
            <Stack
              direction="row"
              justifyContent="flex-end"
              width={(windowSize.width as number) > 400 ? "50%" : "100%"}
              mb={3}
            >
              <SearchField />
            </Stack>
          )}
        </Stack>

        <Stack
          sx={{
            width: "100%",
            height: { md: 400, sm: 300, xs: 250 },
          }}
        >
          <img
            style={{ width: "100%", borderRadius: 10, height: "100%" }}
            src="/img.png"
            alt=""
          />
        </Stack>
        <Button
          sx={{
            borderRadius: 15,
            mb: 1,
            mt: 3,
            textTransform: "capitalize",
          }}
          color="error"
          variant="contained"
          size="large"
        >
          Business
        </Button>
        <Box sx={{ fontSize: { xs: 18, sm: 25 }, fontWeight: 700, my: 2 }}>
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam,
          asperiores.",
        </Box>
        <Box
          sx={{
            borderRadius: 5,
            p: 2,
            fontWeight: 600,
            fontSize: 18,
            lineHeight: 1.5,
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad soluta
          ratione necessitatibus sed vitae natus. Deleniti, numquam. Sit, quae
          vel.
        </Box>
        <Box
          sx={{
            borderRadius: 5,
            borderLeft: "4px solid maroon",
            mt: 4,
            p: 2,
            fontWeight: 500,
            lineHeight: 1.5,
          }}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab nesciunt
          dolorum quas eaque quidem exercitationem vel nemo architecto
          voluptates nam.
          <Box sx={{ fontWeight: 600, color: "maroon", mt: 2 }}>
            - Anthony Fredmman
          </Box>
        </Box>
        <Box
          sx={{ fontSize: { xs: 17, sm: 20 }, fontWeight: 700, mt: 4, mb: 2 }}
        >
          Comments
        </Box>
        <Box mt={2}>
          {" "}
          <Stack
            direction="row"
            spacing={2}
            sx={{
              width: "100%",
              border: "2px solid #eee",
              p: 2,
              borderRadius: 5,
            }}
          >
            <Avatar>I</Avatar>
            <Stack direction="column" spacing={2}>
              <Box sx={{ fontSize: { xs: 16, sm: 18 }, fontWeight: 600 }}>
                Alexander Doe
              </Box>
              <Box sx={{ fontWeight: 400 }}>
                <Box>{moment("20111031", "YYYYMMDD").fromNow()}</Box>
              </Box>
              <Box>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem
                perspiciatis ea aut voluptate necessitatibus rerum cumque
                quaerat, quod nobis pariatur?
              </Box>
            </Stack>
          </Stack>
        </Box>
        <Box
          sx={{ fontSize: { xs: 17, sm: 20 }, fontWeight: 700, mt: 4, mb: 2 }}
        >
          Add a comment
        </Box>
        <Box width="100%">
          <TextField
            multiline
            rows={4}
            sx={{ width: "100%", borderRadius: 5 }}
            placeholder="Your Comment*"
          />
          <Stack justifyContent="flex-end" direction="row">
            <Button
              sx={{
                borderRadius: 15,
                mb: 1,
                mt: 3,
                textTransform: "capitalize",
              }}
              color="error"
              variant="contained"
              size="large"
            >
              Post Comment
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Post;
