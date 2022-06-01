import * as React from 'react';
import { NativeLineGraph } from './native-exports';
import { LineGraphProps } from './types';

export const LineGraph = (props: LineGraphProps) => {
  return <NativeLineGraph {...props} />;
};
