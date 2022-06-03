import { CompanyProps } from '../types';
import { intialValues } from '../screens/Companies/CompaniesScreen';

export const getCompanyAverages = (companyData: CompanyProps[]) => {
  const totals = companyData.reduce((agg, curr) => {
    const aggCopy = [...agg];
    curr.revenue.forEach(item => (agg[item.seq].value += item.value));
    return aggCopy;
  }, intialValues);

  return totals.reduce((agg, curr) => {
    const aggCopy = [...agg];
    aggCopy[curr.seq].value = curr.value / companyData.length;
    return agg;
  }, intialValues);
};
