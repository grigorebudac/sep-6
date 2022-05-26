import styled from "@emotion/styled";
import { Dialog as MuiDialog, DialogTitle } from "@mui/material";
import Avatar from '@mui/material/Avatar';

export const Dialog = styled(MuiDialog)`
  z-index: 10001;
`;

export const ListTitle = styled(DialogTitle)`
  font-weight: bold;
`;

export const ColoredAvatar = styled(Avatar)`
  background-color: ${(props) => props.theme.palette.background.main};
`;