import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Validations } from './Validation';
import { CheckboxService } from './checkbox.service';
import { error } from 'protractor';

// Run ng test
describe('ValidationTest', () => {
  it('ValidateCurrency', () => {
    const result = Validations.IsValidCurrency('DKKK');

    let isValid = false;

    result.forEach((err) => {
      if (err === 'Currency is not three chars long') {
        isValid = true;
      }
    });

    expect(isValid).toEqual(true);
  });

  it('ValidateDate Sunday or Saturday', () => {
    console.log('testing');
    const result = Validations.IsValidDate('20200207');
    let isValid = false;

    result.forEach((err) => {
      if (err === 'Date cannot be saturday or sunday') {
        isValid = true;
      }
    });
    expect(isValid).toEqual(true);
  });

  it('ValidateDate first of January', () => {
    const result = Validations.IsValidDate('20200001');

    let isValid = false;

    result.forEach((err) => {
      if (err === 'Date cannot be first of January') {
        isValid = true;
      }
    });

    expect(isValid).toEqual(true);
  });

  it('ValidateDate first of January V2', () => {
    const result = Validations.IsValidDate('20190001');

    let isValid = false;

    result.forEach((err) => {
      if (err === 'Date cannot be first of January') {
        isValid = true;
      }
    });

    expect(isValid).toEqual(true);
  });

  it('ValidateDate first of January V3', () => {
    const result = Validations.IsValidDate('20070001');

    let isValid = false;

    result.forEach((err) => {
      if (err === 'Date cannot be first of January') {
        isValid = true;
      }
    });

    expect(isValid).toEqual(true);
  });

  xit('ValidateDate bookInFebosfirstmondayofmonth', () => {
    const checkboxService = new CheckboxService();

    checkboxService.bookInFebos = true;
    checkboxService.bookInFebosAndUploadToGfs = false;
    checkboxService.uploadToGfs = false;

    const result = Validations.IsValidDate('20200501', checkboxService);

    let isValid = false;

    result.forEach((err) => {
      if (
        err ===
        'The date has to be today\'s date or after when it is the first monday in the month and book in febos in checked.'
      ) {
        isValid = true;
      }
    });

    expect(isValid).toEqual(true);
  });

  it('ValidateCounterAccountIDKT', () => {
    const checkboxService = new CheckboxService();

    checkboxService.bookInFebosAndUploadToGfs = true;

    // skal være udfyldt
    // HVIS (BookinFebos || BookandUpload) må længen kun være 10 karakterer lang
    // hvis ikke en af de 2 er sande må længen være op til 14 karakterer lang

    const result = Validations.IsValidCounterAccountIDKT(
      '34HS9808763',
      checkboxService
    );

    let isValid = false;

    result.forEach((err) => {
      if (err === 'Cannot be over 10 characters') {
        isValid = true;
      }
    });
  });

  it('ValidSkemaid', () => {
    // kan være tom hvis kolonne K er udfyldt
    // skal være udfyldt
    // må ikke være over 20 karaktere lang
    // K = pdst

    expect(Validations.IsValidSkemaid('RES010401111111111111', '')[0]).toBe(
      'Cannot be over 20'
    );
    expect(Validations.IsValidSkemaid('', 'OBLPULJ1').length).toBe(0);
    expect(Validations.IsValidSkemaid('', '')[0]).toBe('Cannot be empty');
  });

  it('ValidSkemarakke', () => {
    // hvis tom skal den default til "NOCHARTNAME"
    // hvis tom skal kolonne G default til  "0"
    // hvis udfyldt skal det være et tal mellem 1 og 99999

    // G = valutakode
    // K = pdst

    expect(Validations.IsValidSkemarakke('0')[0]).toBe(
      'Must be 2 or more characters'
    );
    expect(Validations.IsValidSkemarakke('999999')[0]).toBe(
      'Must be 2 or more characters'
    );
  });

  it('ValidDkkBass', () => {
    // skal være udfyldt
    // skal være 1 eller 2

    expect(Validations.IsValidDkkBass('4')[0]).toBe('Must be 2 or 1');
    expect(Validations.IsValidDkkBass('')[0]).toBe('Cannot be empty');
  });

  it('ValidLdkd', () => {
    // skal være udfyldt
    // være enten 2 karakter eller større
    // må ikke indeholde tal eller speciel tegn

    expect(Validations.IsValidLdkd('K')[0]).toBe(
      'Must be 2 or more characters'
    );
    expect(Validations.IsValidLdkd('')[0]).toBe('Cannot be empty');
  });

  it('ValidKngr', () => {
    // må ikke være over 2 karakter lang , konflikter med output defination som er 8 lang

    expect(Validations.IsValidKngr('602')[0]).toBe(
      'Cannot be over 2 characters'
    );
  });

  it('ValidKngr_typ', () => {
    // må ikke være over 2 karakter lang , konflikter med output defination som er 8 lang

    expect(Validations.IsValidKngrTyp('FEBB')[0]).toBe(
        'Must be 3 characters'
    );
    expect(Validations.IsValidKngrTyp('FB')[0]).toBe(
        'Must be 3 characters'
    );
  });

  it('ValidPdst', () => {
    // må være blank (melemrum) eller tom
    // må være 8 karakter
    // må være 6 karakter
    // hvis 6 karakter lang skal det være tal

    expect(Validations.IsValidPdst('OBLPUL')[0]).toBe(
        'pdst must be number when 6 char long'
    );

    expect(Validations.IsValidPdst('OB')[0]).toBe(
        'pdst must be number when 8 char long or 6'
    );

  });
});
