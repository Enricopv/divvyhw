import { ViewProps } from 'react-native';

export interface LineGraphProps extends ViewProps {
  data?: { x: number; y: number }[];
}
