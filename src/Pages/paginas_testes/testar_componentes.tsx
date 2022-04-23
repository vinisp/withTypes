//import React from "react";
//Testando Paginação

import { Box, ButtonGroup } from "@mui/material";

const MAX_ITEMS = 10;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

export function Pagination({ limit, total, offset, setOffset }: any) {
  const current = offset ? offset / limit + 1 : 1;
  const pages = Math.ceil(total / limit);

  const first = Math.max(current - MAX_LEFT, 1);

  return (
    <>
      <Box
        sx={{
          paddingTop: 2,
          paddingBottom: 2,

          ul: {
            listStyle: "none",
          },
          display: ["none", "none", "flex", "flex"],
        }}
      >
        <ul>
          <ButtonGroup
            sx={{
              gap: "5px",
            }}
          >
            {Array.from({ length: Math.min(MAX_ITEMS, pages) })
              .map((_, index) => index + first)
              .map((page) => (
                <li key={page}>
                  <button
                    onClick={() => setOffset((page - 1) * limit)}
                    className={
                      page === current ? "btnpage page-active" : "btnpage"
                    }
                  >
                    {page}
                  </button>
                </li>
              ))}
          </ButtonGroup>
        </ul>
      </Box>
    </>
  );
}
