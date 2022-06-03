import { ViewProps } from 'react-native';
import { CompanyProps } from '../types';

export interface CompanyGraphProps extends ViewProps {
  data?: (CompanyProps & DataOptions)[];
  yAxisEnabled?: boolean;
  xAxisEnabled?: boolean;
  legendEnabled?: boolean;
  onValueTouch?: (e: { nativeEvent: { x: number; y: number } }) => void;
}

type DataOptions = {
  graphOptions?: {
    drawFilledEnabled?: boolean;
    drawCirclesEnabled?: boolean;
    color?: string;
    drawValuesEnabled?: boolean;
    lineWidth?: number;
  };
};
