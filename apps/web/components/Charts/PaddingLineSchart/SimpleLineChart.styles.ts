import styled from "@emotion/styled";
import { alpha } from "@mui/material";
import { ResponsiveContainer } from "recharts";

export const Container = styled(ResponsiveContainer)`
  padding: 2rem 0rem;

  .recharts-rectangle {
    transition: fill 0.2s linear;
    cursor: pointer;
    z-index: 2;
  }
  .recharts-rectangle:hover {
    fill: ${({ theme }) => theme.palette.background.main};
  }
  .recharts-tooltip-cursor {
    visibility: visible;
    width: 4rem !important;
    fill: ${({ theme }) => alpha(theme.palette.background.main, 0.1)};
    stroke: ${({ theme }) => theme.palette.background.main};
  }
  .recharts-active-dot {
    stroke: ${({ theme }) => theme.palette.background.main};
    fill: ${({ theme }) => theme.palette.background.main};
  }
  .recharts-active-dot circle {
    fill: ${({ theme }) => theme.palette.background.main};
  }

  .recharts-tooltip-wrapper {
    padding: 0px 1rem;
    background: ${({ theme }) => theme.palette.background.main};
    border-radius: 0.5rem;
    margin-left: -1.25rem;
  }
  .recharts-tooltip-wrapper .label {
    color: ${({ theme }) => theme.palette.system.main};
    font-family: "Basier Square", sans-serif;
    font-size: 0.8rem;
    text-align: center;
  }
  .recharts-tooltip-wrapper::after {
    content: "";
    width: 1rem;
    height: 1rem;
    left: 50%;
    background: ${({ theme }) => theme.palette.background.main};
    position: absolute;
    transform: translate(-50%, -50%) rotate(45deg);
    border-radius: 0.2rem;
    z-index: 0;
  }

  .recharts-x-axis .recharts-cartesian-axis-tick:first-child text {
    font-size: 0;
  }
`;
