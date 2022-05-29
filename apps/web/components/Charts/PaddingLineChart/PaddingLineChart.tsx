import { Skeleton, Theme, useTheme } from '@mui/material';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TooltipProps } from 'recharts/types/component/Tooltip';
import { Analytics } from 'types';

import * as Styles from './PaddingLineChart.styles';

interface PaddingLineChartProps {
  lineColor: string;
  isLoading: boolean;
  data: Analytics.AverageRatingOverYears[];
}

const CustomTooltip = (props: TooltipProps<any, string>) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <Styles.Tooltip>
          <p className="label">{`Year: ${payload[0].payload.year}`}</p>
          <p className="label">{`Rating: ${payload[0].payload.rating.toFixed(
            2,
          )}`}</p>
        </Styles.Tooltip>
      </div>
    );
  }

  return null;
};

const PaddingLineChart = ({
  isLoading,
  lineColor,
  data,
}: PaddingLineChartProps) => {
  const theme = useTheme<Theme>();

  if (isLoading) {
    return <Skeleton variant="rectangular" width="100%" height="100%" />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={500} height={300} data={data}>
        <XAxis
          dataKey="year"
          padding={{ left: 30, right: 30 }}
          stroke="white"
        />
        <YAxis padding={{ top: 30, bottom: 0 }} stroke="white" />
        <Tooltip
          content={<CustomTooltip />}
          position={{ y: -10 }}
          offset={0}
          coordinate={{ x: -50, y: 0 }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="rating"
          name="Average movie rating over the years"
          stroke={lineColor}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PaddingLineChart;
