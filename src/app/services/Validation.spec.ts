import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Validations } from './Validation';
import { CheckboxService } from './checkbox.service';

// Run ng test
describe('ValidationTest', () => {

    it('ValidateCurrency', () => {
    const result = Validations.IsValidCurrency('DKKK')

    expect(result[0]).toEqual('Currency is not three chars long');
    });

    it('ValidateDate', () => {
        const result = Validations.IsValidDate('', new CheckboxService[])

        expect(result[0]).toEqual('Currency is not three chars long');
        });
});
