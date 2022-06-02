import { ViewProps } from 'react-native';
import { CompanyProps } from '../types';

export interface LineGraphProps extends ViewProps {
  data?: { x: number; y: number }[];
}

export interface CompanyGraphProps extends ViewProps {
  data?: CompanyProps;
}
