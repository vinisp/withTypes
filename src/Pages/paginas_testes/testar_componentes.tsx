//import React from "react";

import { Box } from "@mui/material";
import Plyr from "plyr-react";

export function TestarComponentes() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F2f2f2",
          paddingTop: "80px",
        }}
      >
        <h1>Página para teste de componentes</h1>
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
