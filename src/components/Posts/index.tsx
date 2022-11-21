import { Grid } from "@mui/material";
import { Box, Stack } from "@mui/system";
import Pagination from "@mui/material/Pagination";

import PostCard from "../reusables/PostCard";
import { useWindowSize } from "../../hooks/useWindowSize";
import SearchField from "../reusables";

const Posts = () => {
  const windowSize = useWindowSize();

  return (
    <>
      <Box width="100%">
        <Stack direction="row" justifyContent="flex-end" width="100%" px={2}>
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
        <Stack direction="column" width="100%" spacing={2} alignItems="center">
          <Box
            sx={{
              fontSize: { xs: 25, sm: 30 },
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            Latest Blog Posts
          </Box>
          <Box
            sx={{
              fontSize: { xs: 14, sm: 16 },
              maxWidth: 600,
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            Ut aut reiciendis voluptatibus maiores alias consequatur aut
            perferendis doloribus asperiores repellat.
          </Box>
        </Stack>
        <Stack sx={{ width: "100%" }}>
          <Grid
            container
            mt={2}
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Grid item xs={12} md={4} sm={6}>
              <PostCard />
            </Grid>
            <Grid item xs={12} md={4} sm={6}>
              <PostCard />
            </Grid>
            <Grid item xs={12} md={4} sm={6}>
              <PostCard />
            </Grid>
            <Grid item xs={12} md={4} sm={6}>
              <PostCard />
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="center" width="100%" mt={6}>
            <Pagination
              size={(windowSize.width as number) >= 600 ? "large" : "small"}
              count={50}
              variant="outlined"
              color="secondary"
            />
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Posts;
