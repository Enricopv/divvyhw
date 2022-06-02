import * as React from 'react';
import { NativeCompanyGraphView, NativeLineGraph } from './native-exports';
import { CompanyGraphProps, LineGraphProps } from './types';

export const LineGraph = (props: LineGraphProps) => {
  return <NativeLineGraph {...props} />;
};

export const CompanyGraph = (props: CompanyGraphProps) => {
  return <NativeCompanyGraphView {...props} />;
};
