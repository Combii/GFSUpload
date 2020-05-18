import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultValueService } from './default-value.service';
import { IBookKeeping } from 'src/models/IbookKeeping';

describe('Validation Default Test', () => {
  let defaultService: DefaultValueService;
  beforeEach(() => {
    defaultService = new DefaultValueService();
  });

  const testData: IBookKeeping =
    {
      Dato: '',
      RegNr: '',
      regnskabstype: '',
      dkkbass: '',
      skema_id: '',
      skemarakke: '',
      valutakod: '',
      ldkd: '',
      kngr: '',
      kngr_typ: '',
      pdst: '',
      sum_rgopid: '',
      opdater_lev: '',
      leveran_kor: '',
      leveran_type: '',
      saldo: '',
      Tekst: '',
    };

  it('Validate Skemarække default', () => {
    const newTest = defaultService.defaultSkemarakke(testData)
    expect(newTest.skemarakke).toBe('NOCHARTNAME');
    expect(newTest.valutakod).toBe('0');
  });

  it('Validate Kngr default', () => {
    const newTest = defaultService.defaultKngr(testData)
    expect(newTest.kngr).toBe('00');

    testData.kngr = '1';

    const newTest2 = defaultService.defaultKngr(testData)
    expect(newTest2.kngr).toBe('01');
  });


});
