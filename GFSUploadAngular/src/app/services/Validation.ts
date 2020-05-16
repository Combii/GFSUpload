import {
  IAccountBookKeeping,
  IAccountBookKeepingError,
} from 'src/models/IAccountBookKeeping';
import { IBookKeeping, IBookKeepingError } from 'src/models/IbookKeeping';
import { CheckboxService } from './checkbox.service';
import { deflate } from 'zlib';
import { environment } from 'src/environments/environment';

export class Validations {
  static validateAccountBookKeepingError(
    accountBookKeeping: IAccountBookKeeping,
    checkBoxService: CheckboxService
  ): IAccountBookKeepingError {
    const errors: IAccountBookKeepingError = {
      AccountingDate: Validations.IsValidDate(
        accountBookKeeping.AccountingDate,
        checkBoxService
      ),
      RegistrationNo: Validations.IsValidRegNumber(
        accountBookKeeping.RegistrationNo
      ),
      Currency: Validations.IsValidCurrency(accountBookKeeping.Currency),
      IDKT: Validations.IsValidIDKT(accountBookKeeping.IDKT, checkBoxService),
      OriginalIDKT: Validations.IsValidOriginalIDKT(
        accountBookKeeping.OriginalIDKT
      ),
      CounterAccountIDKT: Validations.IsValidCounterAccountIDKT(
        accountBookKeeping.CounterAccountIDKT,
        checkBoxService
      ),
      ProjectCode: Validations.IsValidProjectCode(
        accountBookKeeping.ProjectCode
      ),
      Balance: Validations.IsValidBalance(accountBookKeeping.Balance),
      Text: Validations.IsValidText(accountBookKeeping.Text),
    };

    return errors;
  }

  static validateCSVBookKeeping(
    csvBookKeeping: IBookKeeping
  ): IBookKeepingError {
    const errors: IBookKeepingError = {
      Dato: Validations.IsValidDate(csvBookKeeping.Dato),
      valutakod: Validations.IsValidCurrency(csvBookKeeping.valutakod),
      RegNr: Validations.IsValidRegNumber(csvBookKeeping.RegNr),
      regnskabstype: Validations.IsValidRegnskabstype(
        csvBookKeeping.regnskabstype
      ),
      dkkbass: Validations.IsValidDkkBass(csvBookKeeping.dkkbass),
      skema_id: Validations.IsValidSkemaid(
        csvBookKeeping.skema_id,
        csvBookKeeping.pdst
      ),
      skemarakke: Validations.IsValidSkemarakke(csvBookKeeping.skemarakke),
      ldkd: Validations.IsValidLdkd(csvBookKeeping.ldkd),
      kngr: Validations.IsValidKngr(csvBookKeeping.kngr),
      kngr_typ: Validations.IsValidKngrTyp(csvBookKeeping.kngr_typ),
      pdst: Validations.IsValidPdst(csvBookKeeping.pdst),
      sum_rgopid: Validations.IsValidSum(csvBookKeeping.sum_rgopid),
      opdater_lev: Validations.IsValidOpdateLev(csvBookKeeping.opdater_lev),
      leveran_kor: Validations.IsValidKor(
        csvBookKeeping.leveran_kor,
        csvBookKeeping.pdst
      ),
      leveran_type: Validations.IsValidLeveranType(csvBookKeeping.leveran_type),
      saldo: Validations.IsValidBalance(csvBookKeeping.saldo),
      Tekst: Validations.IsValidText(csvBookKeeping.Tekst),
    };
    return errors;
  }

  static IsValidOriginalIDKT(OriginalIDKT: string): string[] {
    const errorsArray: string[] = [];

    // kan være udfyldt eller blank

    return errorsArray;
  }

  static IsValidCounterAccountIDKT(
    counterAccountIDKT: string,
    checkboxService: CheckboxService
  ): string[] {
    const errorsArray: string[] = [];

    // skal være udfyldt
    // HVIS (BookinFebos || BookandUpload) må længen kun være 10 karakterer lang
    // hvis ikke en af de 2 er sande må længen være op til 14 karakterer lang

    if (!Validations.isNotEmptyString(counterAccountIDKT)) {
      errorsArray.push('Cannot be empty');
    } else if (checkboxService.bookInFebosAndUploadToGfs) {
      if (counterAccountIDKT.length > 10) {
        errorsArray.push('Cannot be over 10 characters');
      }
    } else {
      if (counterAccountIDKT.length > 14) {
        errorsArray.push('Cannot be over 14 characters');
      }
    }
    errorsArray.push('Must be 2 or 1');
    return errorsArray;
  }

  static IsValidDkkBass(dkkbass: string): string[] {
    const errorsArray: string[] = [];

    // skal være udfyldt
    // skal være 1 eller 2

    if (!Validations.isNotEmptyString(dkkbass)) {
      errorsArray.push('Cannot be empty');
      return errorsArray;
    } else if (dkkbass === '1' || dkkbass === '2') {
      return errorsArray;
    }
    errorsArray.push('Must be 2 or 1');
    return errorsArray;
  }

  static IsValidSkemaid(skemarakke: string, pdst: string): string[] {
    const errorsArray: string[] = [];

    // kan være tom hvis kolonne K er udfyldt
    // skal være udfyldt
    // må ikke være over 20 karaktere lang
    // K = pdst

    if (
      Validations.isNotEmptyString(pdst) &&
      !Validations.isNotEmptyString(skemarakke)
    ) {
      return errorsArray;
    }
    if (!Validations.isNotEmptyString(skemarakke)) {
      errorsArray.push('Cannot be empty');
    } else if (skemarakke.length > 20) {
      errorsArray.push('Cannot be over 20');
    }

    return errorsArray;
  }

  static IsValidSkemarakke(skemarakke: string): string[] {
    const errorsArray: string[] = [];

    // hvis tom skal den default til "NOCHARTNAME"
    // hvis tom skal kolonne G default til  "0"
    // hvis udfyldt skal det være et tal mellem 1 og 99999

    // G = valutakode
    // K = pdst

    if (Validations.isNotEmptyString(skemarakke)) {
      if (Number(skemarakke) > 99999 || Number(skemarakke) < 1) {
        errorsArray.push('Must be 2 or more characters');
      }
    }

    return errorsArray;
  }

  static IsValidLdkd(ldkd: string): string[] {
    const errorsArray: string[] = [];

    // skal være udfyldt
    // være enten 2 karakter eller større
    // må ikke indeholde tal eller speciel tegn

    if (!Validations.isNotEmptyString(ldkd)) {
      errorsArray.push('Cannot be empty');
    } else if (ldkd.length < 2) {
      errorsArray.push('Must be 2 or more characters');
    }

    if (!/^[A-Za-z\s]+$/.test(ldkd)) {
      errorsArray.push('Cannot have special characters');
    }

    return errorsArray;
  }

  static IsValidKngr(kngr: string): string[] {
    const errorsArray: string[] = [];

    // må ikke være over 2 karakter lang , konflikter med output defination som er 8 lang

    if (kngr.length > 2) {
      errorsArray.push('Cannot be over 2 characters');
    }
    return errorsArray;
  }

  static IsValidKngrTyp(kngr_typ: string): string[] {
    const errorsArray: string[] = [];

    if (!Validations.isNotEmptyString(kngr_typ)) {
      errorsArray.push('Cannot be empty');
    } else if (kngr_typ.length !== 3) {
      errorsArray.push('Must be 3 characters');
    }

    return errorsArray;
  }

  static IsValidPdst(pdst: string): string[] {
    const errorsArray: string[] = [];

    // må være blank (melemrum) eller tom
    // må være 8 karakter
    // må være 6 karakter
    // hvis 6 karakter lang skal det være tal
    if (pdst.length === 6) {
      if (!/^\d{6}$/.test(pdst)) {
        errorsArray.push('pdst must be number when 6 char long');
      }
    }

    if (pdst.length !== 8 && pdst.length !== 6) {
      errorsArray.push('pdst must be number when 8 char long or 6');
    }

    return errorsArray;
  }

  static IsValidSum(sum_rgopid: string): string[] {
    const errorsArray: string[] = [];

    if (sum_rgopid !== 'B') {
      errorsArray.push('sum_rgopid must be equal B');
    }
    return errorsArray;
  }

  static IsValidOpdateLev(opdater_lev: string): string[] {
    const errorsArray: string[] = [];

    if (opdater_lev === 'J' || opdater_lev === 'N') {
      return errorsArray;
    }
    errorsArray.push('opdater_lev must be equal to either J or N');
    return errorsArray;
  }

  static IsValidKor(leveran_kor: string, pdst: string): string[] {
    const errorsArray = [];

    // skal være enten "L" eller "K" eller "B"
    // Hvis L må kolonne K ikke være udfyldt
    // K = pdst

    if (leveran_kor === 'L' || leveran_kor === 'K' || leveran_kor === 'B') {
      if (leveran_kor === 'L') {
        if (Validations.isNotEmptyString(pdst)) {
          errorsArray.push(
            'If value is L then column pdst can not be specified'
          );
        }
      }
      return errorsArray;
    }

    errorsArray.push('leveran_kor must be equal to either K or B or L');

    return errorsArray;
  }

  static IsValidLeveranType(leveran_type: string): string[] {
    const errorsArray: string[] = [];

    if (leveran_type === 'MB' || leveran_type === 'PL') {
      return errorsArray;
    }
    errorsArray.push('leveran_type must be equal to either PL or MB');
    return errorsArray;
  }

  static IsValidDate(
    date: string,
    checkBoxService?: CheckboxService
  ): string[] {
    const errorsArray = [];

    // https://stackoverflow.com/questions/10638529/how-to-parse-a-date-in-format-yyyymmdd-in-javascript
    if (!/^(\d){8}$/.test(date)) {
      errorsArray.push('Date must be 8 digits only');
    }

    const year = Number(date.toString().substring(0, 4));
    const month = Number(date.toString().substring(4, 6));
    const day = Number(date.toString().substring(6, 8));

    const parsedDate = new Date(year, month, day);

    // Check if sunday or saturday
    const dayOfWeek = parsedDate.getDay();

    // Saturday === 6
    // Sunday === 1
    if (dayOfWeek === 6 || dayOfWeek === 1) {
      errorsArray.push('Date cannot be saturday or sunday');
    }

    // Check if first of January
    const theMonth = parsedDate.getMonth();
    const dayOfMonth = parsedDate.getDate();

    if (month === 0 && dayOfMonth === 1) {
      errorsArray.push('Date cannot be first of January');
    }

    console.log(Validations.isFirstMondayOfMonth());

    if (checkBoxService) {
      // If bookInFebos is checked and it is first monday of month, the date has to be today's date or after.
      if (
        !Validations.isFirstMondayOfMonth(
          environment.production ? parsedDate : null
        ) &&
        checkBoxService.bookInFebos
      ) {
        if (parsedDate.getMilliseconds() < new Date().getMilliseconds())
          errorsArray.push(
            'The date has to be today\'s date or after when it is the first monday in the month and book in febos in checked.'
          );
      }

      if (checkBoxService.bookInFebosAndUploadToGfs) {
        const thisDate = new Date();

        if (
          parsedDate.getDate() === thisDate.getDay() &&
          parsedDate.getMonth() === thisDate.getMonth() &&
          parsedDate.getFullYear() === thisDate.getFullYear()
        ) {
          errorsArray.push('Cannot book and make corrections on the same date');
        }
      }
    }

    return errorsArray;
  }

  private static isFirstMondayOfMonth(date = new Date()): boolean {
    const currentMonth = date.getMonth();

    if (date.getDay() === 1) {
      // Then check if we are still in the same month if we go 7 days back in time. If we're not, then it is the first monday
      date.setDate(date.getDate() - 7);
      if (currentMonth !== date.getMonth()) {
        return true;
      }
    }

    return false;
  }

  static IsValidCurrency(currency: string): string[] {
    const errorsArray = [];

    if (typeof currency === 'undefined') {
      return errorsArray;
    }

    const specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (currency.toString().length !== 3) {
      if (currency.toString() === '0') {
        return errorsArray;
      }
      errorsArray.push('Currency is not three chars long');
    }

    if (specialChar.test(currency)) {
      errorsArray.push('Currency includes special characters');
    }

    return errorsArray;
    // Cool API call to valid currencies. Could use for future use.
    // https://openexchangerates.org/api/currencies.json
  }

  private static IsValidRegNumber(regNumber: string): string[] {
    // This validation is not complete

    const errorsArray = [];

    const firstNumber = Number(regNumber.toString().substring(0, 2));
    const firstLastNumberOrChar = regNumber.toString().substring(2, 3);
    const secondLastNumberOrChar = regNumber.toString().substring(3, 4);

    if (regNumber.toString().length !== 4) {
      errorsArray.push('Is not 4 in length');
    }

    if (firstNumber < 30 || firstNumber > 49) {
      errorsArray.push('First two digits are not between 30 and 49');
    }

    if (
      isNaN(Number(firstLastNumberOrChar)) &&
      isNaN(Number(secondLastNumberOrChar))
    ) {
      errorsArray.push(
        'second last char and last char cannot both be digits or characters'
      );
    }

    if (
      !isNaN(Number(firstLastNumberOrChar)) &&
      !isNaN(Number(secondLastNumberOrChar))
    ) {
      errorsArray.push(
        'second last char and last char cannot both be digits or characters'
      );
    }

    return errorsArray;
  }

  private static IsValidIDKT(
    IDKT: string,
    checkboxService: CheckboxService
  ): string[] {
    const errorsArray = [];

    if (!Validations.isNotEmptyString(IDKT)) {
      errorsArray.push('Is empty');
    }

    if (checkboxService.bookInFebosAndUploadToGfs) {
      if (IDKT.length > 10) {
        errorsArray.push('Is longer than 10 characters');
      }
    } else {
      if (IDKT.length > 14) {
        errorsArray.push('Is longer than 14 characters');
      }
    }
    return errorsArray;
  }

  private static IsValidProjectCode(projectCode: string): string[] {
    const errorsArray = [];

    if (!Validations.isNotEmptyString(projectCode)) {
      errorsArray.push('Is empty');
    }
    if (projectCode !== '078') {
      errorsArray.push('Project Code must be 078');
    }

    return errorsArray;
  }

  static IsValidText(text: string): string[] {
    const errorsArray = [];

    if (!Validations.isNotEmptyString(text)) {
      errorsArray.push('Is empty');
    }
    if (text.length > 40) {
      errorsArray.push('Text must not be longer than 40 characters');
    }

    return errorsArray;
  }

  private static isNotEmptyString(dataString: string): boolean {
    if (dataString.length <= 0) {
      return false;
    } else if (dataString === ' ') {
      return false;
    } else if (dataString === ' ‏‏‎ ') {
      return false;
    }

    return true;
  }

  static IsValidBalance(balance: any): string[] {
    const errorsArray: string[] = [];

    if (!Validations.isNotEmptyString(balance)) {
      errorsArray.push('Cannot be empty');
      return errorsArray;
    }

    if (balance.length > 16) {
      errorsArray.push('Balance must not exceed 16 characters');
    }

    if (!/^-?\d*\,?\d*$/.test(balance)) {
      errorsArray.push('Is not a valid digit');
    }

    return errorsArray;
  }

  private static IsValidRegnskabstype(regnskabstype: any): string[] {
    const errorsArray = [];

    if (!Validations.isNotEmptyString(regnskabstype)) {
      errorsArray.push('Is empty');
    }
    if (regnskabstype.length > 6) {
      errorsArray.push('Cannot be more than 6 characters long');
    }
    return errorsArray;
  }
}
