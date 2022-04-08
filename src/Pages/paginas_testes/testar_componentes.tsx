//import React from "react";

import { Box } from "@mui/material";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";

export function TestarComponentes() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F2f2f2",
          paddingTop: "80px",
          width: "350px",
        }}
      >
        <Plyr
          source={{
            type: "video",
            sources: [
              {
                src: "268402641",
                provider: "vimeo",
              },
            ],
          }}
        />
      </Box>
    </>
  );
}
