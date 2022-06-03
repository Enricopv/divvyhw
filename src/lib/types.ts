import { ViewProps } from 'react-native';
import { CompanyProps } from '../types';

export interface LineGraphProps extends ViewProps {
  data?: { x: number; y: number }[];
}

export interface CompanyGraphProps extends ViewProps {
  data?: (CompanyProps & DataOptions)[];
  yAxisEnabled?: boolean;
  xAxisEnabled?: boolean;
  legendEnabled?: boolean;
}

type DataOptions = {
  graphOptions?: {
    drawFilledEnabled?: boolean;
    drawCirclesEnabled?: boolean;
    color?: string;
    drawValuesEnabled?: boolean;
  };
};
