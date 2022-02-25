import styled from "styled-components";
import StorefrontIcon from '@mui/icons-material/Storefront';

export const Wrapper = styled.div`
  @media screen and (min-width: 640px) {
    margin: 0px;
  }
`;

export const StyledButton = styled(StorefrontIcon)`
  color: blue;
  background: transparent;
`;
