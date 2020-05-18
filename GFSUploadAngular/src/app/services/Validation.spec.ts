import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Validations } from './Validation';
import { CheckboxService } from './checkbox.service';
import { error } from 'protractor';

// Run ng test
describe('Validation Test', () => {
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

  it('ValidateDate bookInFebosfirstmondayofmonth', () => {
    const checkboxService = new CheckboxService();

    checkboxService.bookInFebos = true;
    checkboxService.bookInFebosAndUploadToGfs = true;
    checkboxService.uploadToGfs = true;

    const result = Validations.IsValidDate('20200404', checkboxService, new Date(2020, 5, 1));

    console.log('result', result);

    expect(
      Validations.IsValidDate(
        '20200204',
        checkboxService,
        new Date(2020, 5, 1)
      )[0]
    ).toBe(
      'The date has to be today\'s date or after when it is the first monday in the month and book in febos in checked.'
    );
  });

  it('Validate is First Monday of the month', () => {
    expect(Validations.isFirstMondayOfMonth(new Date(2020, 5, 1))).toBe(true);

    expect(Validations.isFirstMondayOfMonth(new Date(2020, 5, 8))).toBe(false);
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
    expect(isValid).toEqual(true);
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

    expect(Validations.IsValidKngrTyp('FEBB')[0]).toBe('Must be 3 characters');
    expect(Validations.IsValidKngrTyp('FB')[0]).toBe('Must be 3 characters');
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

    expect(Validations.IsValidPdst('OB3451323')[0]).toBe(
      'pdst must be number when 8 char long or 6'
    );
  });

  it('Validsum_rgopid', () => {
    // må være blank (melemrum) eller tom
    // må være 8 karakter
    // må være 6 karakter
    // hvis 6 karakter lang skal det være tal

    expect(Validations.IsValidSum('C')[0]).toBe('sum_rgopid must be equal B');
    expect(Validations.IsValidSum('A')[0]).toBe('sum_rgopid must be equal B');
    expect(Validations.IsValidSum('T')[0]).toBe('sum_rgopid must be equal B');
  });

  it('Validopdater_lev', () => {
    expect(Validations.IsValidOpdateLev('C')[0]).toBe(
      'opdater_lev must be equal to either J or N'
    );
    expect(Validations.IsValidOpdateLev('J').length).toBe(0);
    expect(Validations.IsValidOpdateLev('N').length).toBe(0);
  });

  it('Validleveran_kor', () => {
    // skal være enten "L" eller "K" eller "B"
    // Hvis L må kolonne K ikke være udfyldt
    // K = pdst

    expect(Validations.IsValidKor('L', 'OBLPULJ1')[0]).toBe(
      'If value is L then column pdst can not be specified'
    );

    expect(Validations.IsValidKor('L', '').length).toBe(0);

    expect(Validations.IsValidKor('T', 'OBLPULJ1')[0]).toBe(
      'leveran_kor must be equal to either K or B or L'
    );
  });

  it('Validleveran_type', () => {
    // skal være enten "PL" eller "MB"

    expect(Validations.IsValidLeveranType('PL').length).toBe(0);

    expect(Validations.IsValidLeveranType('PL').length).toBe(0);

    expect(Validations.IsValidLeveranType('TA')[0]).toBe(
      'leveran_type must be equal to either PL or MB'
    );

    expect(Validations.IsValidLeveranType('AVAV')[0]).toBe(
      'leveran_type must be equal to either PL or MB'
    );

    expect(Validations.IsValidLeveranType('T')[0]).toBe(
      'leveran_type must be equal to either PL or MB'
    );

    expect(Validations.IsValidLeveranType('PLL')[0]).toBe(
      'leveran_type must be equal to either PL or MB'
    );
  });

  it('Validsaldo', () => {
    // skal være et tal
    // skal være med komma som decimal adskillese
    // skal formateres til output med med 2 decimaler
    // skal have minus tegn foran beløbfeltes første tal hvis negativt
    // må max fylde 16 karakter incl komma og fortegn

    expect(Validations.IsValidBalance('afea')[0]).toBe('Is not a valid digit');

    expect(Validations.IsValidBalance('200,00').length).toBe(0);

    expect(Validations.IsValidBalance('20021345432756,00')[0]).toBe(
      'Balance must not exceed 16 characters'
    );

    expect(Validations.IsValidBalance('')[0]).toBe('Cannot be empty');

    expect(Validations.IsValidBalance('-200').length).toBe(0);
  });

  it('ValidText', () => {
    expect(Validations.IsValidText('')[0]).toBe('Is empty');

    expect(
      Validations.IsValidText(
        'Character Count Online is an online tool that lets you easily calculate and count the number of characters, words, sentences and paragraphs in your text.'
      )[0]
    ).toBe('Text must not be longer than 40 characters');

    expect(Validations.IsValidText('paragraphs in your text.').length).toBe(0);
  });

  it('ValidIDKT', () => {
    // skal være udfyldt
    // HVIS (BookinFebos || BookandUpload) må længen kun være 10 karakterer lang
    // hvis ikke en af de 2 er sande må længen være op til 14 karakterer lang

    const checkboxService = new CheckboxService();

    checkboxService.bookInFebos = true;
    checkboxService.bookInFebosAndUploadToGfs = true;
    checkboxService.uploadToGfs = true;

    expect(Validations.IsValidIDKT('34MT991016', checkboxService).length).toBe(
      0
    );

    expect(Validations.IsValidIDKT('34MT9910126', checkboxService)[0]).toBe(
      'Is longer than 10 characters'
    );

    checkboxService.bookInFebos = false;
    checkboxService.bookInFebosAndUploadToGfs = false;
    checkboxService.uploadToGfs = false;

    expect(
      Validations.IsValidIDKT('34MT9910126235', checkboxService).length
    ).toBe(0);

    expect(
      Validations.IsValidIDKT('34MT9910126233252535', checkboxService)[0]
    ).toBe('Is longer than 14 characters');
  });

  it('ValidRegNumber', () => {
    // skal være 4 karakter lang
    // skal være udfyldt
    // skal have de samme valideringer som på forsiden

    expect(Validations.IsValidRegNumber('39AS').length).toBe(0);
    expect(Validations.IsValidRegNumber('')[0]).toBe('Is not 4 in length');
    expect(Validations.IsValidRegNumber('32455')[0]).toBe('Is not 4 in length');
    expect(Validations.IsValidRegNumber('325')[0]).toBe('Is not 4 in length');
    expect(Validations.IsValidRegNumber('3')[0]).toBe('Is not 4 in length');
    expect(Validations.IsValidRegNumber('32')[0]).toBe('Is not 4 in length');
  });

  it('ValidOriginalIDKT', () => {
    // kan være udfyldt eller blank
    expect(Validations.IsValidOriginalIDKT('').length).toBe(0);
    expect(Validations.IsValidOriginalIDKT('test').length).toBe(0);
  });

  it('ValidProjectCode', () => {
    // skal være udfyldt
    // skal være '078'
    expect(Validations.IsValidProjectCode('078').length).toBe(0);
    expect(Validations.IsValidProjectCode('')[0]).toBe('Is empty');
    expect(Validations.IsValidProjectCode('079')[0]).toBe(
      'Project Code must be 078'
    );
  });

  it('ValidRegnskabstype', () => {
    // skal være udfyldt
    // må ikke være mere end 6 karakterer lang

    expect(Validations.IsValidRegnskabstype('')[0]).toBe('Is empty');
    expect(Validations.IsValidRegnskabstype('RMKORR').length).toBe(0);
    expect(Validations.IsValidRegnskabstype('RMKORRRRR')[0]).toBe(
      'Cannot be more than 6 characters long'
    );
  });
});
