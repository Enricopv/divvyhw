export interface CompanyProps {
  id: number;
  name: string;
  location: { address: string; city: string; country: string };
  revenue: { seq: number; date: string; value: number }[];
}

export type RootParamList = {
  Companies: undefined;
  Compare: undefined;
  Allowance: undefined;
  CompaniesScreen: undefined;
  CompanyDetail: { id: number };
};
