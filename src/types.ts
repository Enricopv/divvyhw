export interface CompanyProps {
  id: number;
  name: string;
  location?: { address: string; city: string; country: string };
  revenue: { seq: number; date: string; value: number }[];
}

export type RootParamList = {
  TabStack: { [key: string]: any };
  Companies: undefined;
  CompanySearch: undefined;
  Compare: {
    ids: number[];
    onItemSelect: (id: number) => void;
  };
  Allowance: undefined;
  CompaniesScreen: undefined;
  Modal: {
    component: any;
    [key: string]: any;
  };
  CompanyDetail: {
    id: number;
    averages: { seq: number; date: string; value: number }[];
  };
};
