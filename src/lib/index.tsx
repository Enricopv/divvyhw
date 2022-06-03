import * as React from 'react';
import { NativeCompanyGraphView } from './native-exports';
import { CompanyGraphProps } from './types';

export const CompanyGraph = (props: CompanyGraphProps) => {
  return <NativeCompanyGraphView {...props} />;
};
