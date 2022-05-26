import styled from "@emotion/styled";
import { Dialog as MuiDialog, DialogTitle } from "@mui/material";

export const Dialog = styled(MuiDialog)`
  z-index: 10003;
`;

export const Title = styled(DialogTitle)`
  font-weight: bold;
`;