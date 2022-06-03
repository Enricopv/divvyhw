export interface CompanyProps {
  id: number;
  name: string;
  location?: { address: string; city: string; country: string };
  revenue: { seq: number; date: string; value: number }[];
}

export type RootParamList = {
  TabStack: { [key: string]: any };
  Companies: undefined;
  Compare: {
    ids: number[];
    onItemSelect: (id: number) => void;
  };
  Allowance: undefined;
  CompaniesScreen: undefined;
  CompanySearchModal: {
    [key: string]: any;
  };
  CompanyDetail: {
    id: number;
    averages: { seq: number; date: string; value: number }[];
  };
};
