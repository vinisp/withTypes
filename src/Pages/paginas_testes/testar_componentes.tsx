//import React from "react";
//Testando Paginação

import { Box, ButtonGroup } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const MAX_ITEMS = 10;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

export function Pagination({ limit, total, offset, setOffset }: any) {
  const current = offset ? offset / limit + 1 : 1;
  const pages = Math.ceil(total / limit);

  const first = Math.max(current - MAX_LEFT, 1);

  function onPageChange(page: any) {
    setOffset((page - 1) * limit);
  }

  return (
    <>
      <Box
        sx={{
          paddingTop: 2,
          paddingBottom: 2,

          ul: {
            listStyle: "none",
          },
        }}
      >
        <ul>
          <ButtonGroup
            sx={{
              gap: "5px",
            }}
          >
            <li>
              <button
                onClick={() => onPageChange(current - 1)}
                disabled={current === 1}
                className="btnpage"
              >
                <ArrowBackIcon sx={{ fontSize: "16px" }} />
              </button>
            </li>
            {Array.from({ length: Math.min(MAX_ITEMS, pages) })
              .map((_, index) => index + first)
              .map((page) => (
                <li key={page}>
                  <button
                    onClick={() => onPageChange(page)}
                    className={
                      page === current ? "btnpage page-active" : "btnpage"
                    }
                  >
                    {page}
                  </button>
                </li>
              ))}
            <li>
              <button
                onClick={() => onPageChange(current + 1)}
                disabled={current === pages}
                className="btnpage"
              >
                <ArrowForwardIcon sx={{ fontSize: "16px" }} />
              </button>
            </li>
          </ButtonGroup>
        </ul>
      </Box>
    </>
  );
}
