export interface IAccountBookKeepingError {
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

export interface IAccountBookKeeping {
  AccountingDate: string;
  RegistrationNo: string;
  IDKT: string;
  OriginalIDKT: string;
  CounterAccountIDKT: string;
  Text: string;
  ProjectCode: string;
  Currency: string;
  Balance: string;
  errors?: IAccountBookKeepingError;
}
