import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Validations } from './Validation';
import { CheckboxService } from './checkbox.service';
import { error } from 'protractor';

// Run ng test
describe('ValidationTest', () => {

    it('ValidateCurrency', () => {
    const result = Validations.IsValidCurrency('DKKK')

    let isValid = false;

    result.forEach(err => {
        if(err === 'Currency is not three chars long'){
            isValid = true;
        }
    });

    expect(isValid).toEqual(true);
    });

    it('ValidateDate Sunday or Saturday', () => {

        const checkboxService = new CheckboxService();

        checkboxService.bookInFebos = true;
        checkboxService.bookInFebosAndUploadToGfs = true;
        checkboxService.uploadToGfs = true;

        const result = Validations.IsValidDate('20200307', checkboxService);

        let isValid = false;

        result.forEach(err => {
            if(err === 'Date cannot be saturday or sunday'){
                isValid = true;
            }
        });

        expect(isValid).toEqual(true);
    });

    it('ValidateDate first of January', () => {

        const result = Validations.IsValidDate('20200101');

        let isValid = false;

        result.forEach(err => {
            if(err === 'Date cannot be first of January'){
                isValid = true;
            }
        });

        expect(isValid).toEqual(true);
    });

    it('ValidateDate first of January V2', () => {

        const result = Validations.IsValidDate('20190101');

        let isValid = false;

        result.forEach(err => {
            if(err === 'Date cannot be first of January'){
                isValid = true;
            }
        });

        expect(isValid).toEqual(true);
    });

    it('ValidateDate first of January V3', () => {

        const result = Validations.IsValidDate('20070101');

        let isValid = false;

        result.forEach(err => {
            if(err === 'Date cannot be first of January'){
                isValid = true;
            }
        });

        expect(isValid).toEqual(true);
    });
});
