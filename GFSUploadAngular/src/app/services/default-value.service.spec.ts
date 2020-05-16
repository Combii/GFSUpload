import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultValueService } from './default-value.service';
import { IAccountBookKeeping } from 'src/models/IAccountBookKeeping';

describe('ValidationTest', () => {
  let service: DefaultValueService;
  beforeEach(() => {
    service = new DefaultValueService();
  });

  const testData : IAccountBookKeeping[] = [
      {
        AccountingDate: '',
        RegistrationNo: '',
        IDKT: '',
        OriginalIDKT: '',
        CounterAccountIDKT: '',
        Text: '',
        ProjectCode: '',
        Currency: '',
        Balance: '',
      },
      {
        AccountingDate: '',
        RegistrationNo: '',
        IDKT: '',
        OriginalIDKT: '',
        CounterAccountIDKT: '',
        Text: '',
        ProjectCode: '',
        Currency: '',
        Balance: '',
      },

  ]

});
