import React from "react";
import clsx from "clsx";
import styled from "@emotion/styled";

type SidebarMinimiseIconProps = {
  open: boolean;
};

const Container = styled.svg<SidebarMinimiseIconProps>`
  #navButtonChangeNavWidthIconArrow {
    opacity: 1;
    transform-origin: 58.5% 50%;
    transform: rotate(-180deg);
    transition: transform 0.2s linear;
    z-index: 1;
  }
  #navButtonChangeNavWidthIconArrow.minimised {
    transform: rotate(0deg);
  }
  #navButtonChangeNavWidthIconBar {
    transform: translateX(70px);
    transition: transform 0.2s linear;
    z-index: 2;
  }
  #navButtonChangeNavWidthIconBar.minimised {
    transform: translateX(0px);
  }
`;

const SidebarMinimiseIcon = (props: SidebarMinimiseIconProps) => {
  return (
    <Container
      open={props.open}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <path
        id="navButtonChangeNavWidthIconArrow"
        className={clsx({
          minimised: !props.open,
        })}
        d="M94.32071,46.9948l-18.703-18.703a5,5,0,0,0-7.07107,7.07107c.06849.06849.14868.11605.22006.17976l-.01407.01493c4.09267,3.65305,7.72009,6.89075,11.2125,10.008-11.76385-.1905-27.796-.45015-34.88422-.56495v.00708a4.99308,4.99308,0,1,0,0,9.98452v.00708c7.08825-.1148,23.12037-.37445,34.88422-.56495-3.49241,3.11729-7.11983,6.355-11.2125,10.008l.01407.01493c-.07138.06371-.15157.11127-.22006.17976a5,5,0,0,0,7.07107,7.07107l18.703-18.703A4.25,4.25,0,0,0,94.32071,46.9948Z"
        fill="currentColor"
      />
      <rect x="0" width="10" height="100" rx="5" fill="currentColor" />
      <rect
        id="navButtonChangeNavWidthIconBar"
        className={clsx({
          minimised: !props.open,
        })}
        x="20"
        width="10"
        height="100"
        rx="5"
        fill="currentColor"
      />
    </Container>
  );
};

export { SidebarMinimiseIcon };
