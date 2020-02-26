interface Error {
    index: number;
    errorMessage: string;
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
    errors: {};
  }
