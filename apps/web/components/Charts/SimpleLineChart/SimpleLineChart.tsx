import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { BaseAxisProps } from 'recharts/types/util/types';
import { TooltipProps } from 'recharts/types/component/Tooltip';
import { useTheme, Skeleton, Theme } from '@mui/material';

import * as Styles from './SimpleLineChart.styles';

interface SimpleLineChartProps {
  isLoading: boolean;
  data: { x: any; y: any }[];
  xTickFormatter?: BaseAxisProps['tickFormatter'];
  yTickFormatter?: BaseAxisProps['tickFormatter'];
}

const CustomTooltip = (props: TooltipProps<any, string>) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const SimpleLineChart = (props: SimpleLineChartProps) => {
  const theme = useTheme<Theme>();

  if (props.isLoading) {
    return <Skeleton variant="rectangular" width="100%" height="100%" />;
  }

  return (
    <Styles.Container width="100%" height="100%">
      <LineChart
        width={200}
        height={200}
        data={props.data}
        margin={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <XAxis
          dataKey="x"
          tickFormatter={props.xTickFormatter}
          axisLine={false}
          tickLine={false}
          tickCount={7}
          tickMargin={20}
          height={40}
          fontSize={14}
          stroke={theme.palette.primary.main}
        />
        <YAxis
          tickFormatter={props.yTickFormatter}
          axisLine={false}
          tickLine={false}
          fontSize={14}
          stroke={theme.palette.secondary.main}
        />
        <Line
          type="monotoneX"
          dataKey="y"
          stroke={theme.palette.secondary.main}
          dot={true}
        />
        <CartesianGrid
          horizontal={true}
          vertical={false}
          strokeDasharray="2 10"
          stroke={theme.palette.secondary.main}
        />
        <Tooltip
          content={<CustomTooltip />}
          position={{ y: -10 }}
          offset={0}
          coordinate={{ x: -50, y: 0 }}
        />
      </LineChart>
    </Styles.Container>
  );
};

export default SimpleLineChart;
