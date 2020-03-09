import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Validations } from './Validation';

// Run ng test
describe('ValidationTest', () => {

    it('ValidateCurrency', () => {
    const result = Validations.IsValidCurrency('DKKK')

    expect(result[0]).toEqual('Currency is not three chars long');
    });

});
