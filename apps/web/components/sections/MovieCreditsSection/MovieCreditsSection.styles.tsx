import styled from "@emotion/styled";

export const List = styled.ul`
  margin: 0;
  padding: 0;
`

export const ListItem = styled.li`
  display: inline-block;
  &:before {
    content: "\\00a0\\2022\\00a0\\00a0";
    color:#999;
  }
`;
