export interface IExcelBookKeepingError {
  AccountingDate: string[];
  RegistrationNo: string[];
  Currency: string[];
  IDKT: string[];
  OriginalIDKT: string[];
  CounterAccountIDKT: string[];
  ProjectCode: string[];
  Balance: string[];
  Text: string[];
}

export interface IExcelBookKeeping {
  AccountingDate: string;
  RegistrationNo: string;
  IDKT: string;
  OriginalIDKT: string;
  CounterAccountIDKT: string;
  Text: string;
  ProjectCode: string;
  Currency: string;
  Balance: string;
  errors?: IExcelBookKeepingError;
}
