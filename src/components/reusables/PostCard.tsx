import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions, IconButton } from "@mui/material";
import { Box, Stack } from "@mui/system";
import {
  CalendarMonth,
  Favorite,
  FavoriteBorder,
  Person,
  RemoveRedEye,
} from "@mui/icons-material";
import moment from "moment";
import { useComponentSize } from "../../hooks/useComponentSize";
import { formatNumberFunc } from "../../helpers/numbers";
import { Link } from "react-router-dom";

export default function PostCard() {
  const ref = React.useRef<any>(null);
  const cardSize = useComponentSize({ ref });

  const text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sint molestiae accusamus distinctio aut? Cupiditate, ullam minus molestiae error odit minima cum laudantium ea soluta neque ratione magnam porro facere. Enim alias beatae aspernatur inventore unde aliquid repellendus tempora assumenda facere, hic recusandae voluptatem quibusdam itaque quisquam distinctio dolorem, facilis minus repudiandae? Nihil, recusandae sunt. Et culpa provident vero architecto vel cumque beatae dolores animi eveniet quia eaque aliquam, fuga molestiae blanditiis aspernatur non nam expedita quasi inventore. Sequi reprehenderit qui autem ipsa similique aspernatur officia minima nobis alias. Eum non id incidunt architecto iusto quis sed, quia quasi reiciendis.";
  const truncateString = (string: string, length: number) => {
    if (string.length > length) {
      console.log(string.length, length);
      return `${string.slice(0, length)} ...`;
    }
    return string;
  };
  return (
    <Card ref={ref}>
      <CardActions>
        {" "}
        <Link to="1">
          <img
            style={{ width: "100%", borderRadius: 10, height: "100%" }}
            src="/img.png"
            alt=""
          />
        </Link>{" "}
      </CardActions>

      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Button
            sx={{
              borderRadius: 15,
              mb: 1,
              textTransform: "capitalize",
            }}
            color="error"
            variant="contained"
            size="small"
          >
            Business
          </Button>
          <Link to="1">
            <IconButton
              size="small"
              color="error"
              sx={{
                background: "maroon",
                color: "white",
                "&:hover": { background: "maroon" },
              }}
            >
              <RemoveRedEye sx={{ fontSize: 13 }} />
            </IconButton>
          </Link>
        </Stack>

        <Box sx={{ fontSize: { xs: 18, sm: 20 }, fontWeight: 700, my: 2 }}>
          {truncateString(
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, asperiores.",
            70
          )}
        </Box>
        <Stack direction="row" my={2} justifyContent="space-between">
          <Stack
            direction="row"
            alignItems="center"
            sx={{ fontSize: 12, color: "maroon", fontWeight: 500 }}
            spacing={1}
          >
            <Person sx={{ fontSize: 15 }} />
            {(cardSize?.width as number) < 240 ? (
              <Box
                sx={{
                  whiteSpace: "nowrap",
                  width: 40,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Filmanadaman
              </Box>
            ) : (
              <Box>Filmanadaman</Box>
            )}
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            sx={{ fontSize: 12, color: "maroon", fontWeight: 500 }}
            spacing={1}
          >
            <CalendarMonth sx={{ fontSize: 15 }} />
            {(cardSize?.width as number) < 240 ? (
              <Box
                sx={{
                  whiteSpace: "nowrap",
                  width: 40,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {moment("20111031", "YYYYMMDD").fromNow()}
              </Box>
            ) : (
              <Box>{moment("20111031", "YYYYMMDD").fromNow()}</Box>
            )}
          </Stack>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {truncateString(text, 150)}
        </Typography>
        <Stack
          direction="row"
          mt={2}
          sx={{ width: "100%" }}
          justifyContent="flex-start"
          spacing={0.5}
          alignItems="center"
        >
          <FavoriteBorder color="error" sx={{ fontSize: 20 }} />{" "}
          <Box sx={{ fontSize: 11 }}>{formatNumberFunc(1993)}</Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
