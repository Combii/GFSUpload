import { IBookKeeping } from 'src/models/IbookKeeping';
import { IAccountBookKeeping } from 'src/models/IAccountBookKeeping';

export class ListSorter {

  static sortListForErrorsOnlyIBookKeeping(listBookKeeping: IBookKeeping[]): IBookKeeping[] {
    let isTrue = false;
    const tempArrayData: IBookKeeping[] = [];

    listBookKeeping.forEach(rowData => {
      Object.values(rowData.errors).forEach(error => {
        if (error.length > 0) {
          isTrue = true;
        }
      });
      if (isTrue) {
        tempArrayData.push(rowData);
      }
      isTrue = false;
    });

    return tempArrayData;
  }

  static sortListForErrorsOnlyIExcelBookKeeping(listBookKeeping: IAccountBookKeeping[]): IAccountBookKeeping[] {
    let isTrue = false;
    const tempArrayData: IAccountBookKeeping[] = [];

    listBookKeeping.forEach(rowData => {
      Object.values(rowData.errors).forEach(error => {
        if (error.length > 0) {
          isTrue = true;
        }
      });
      if (isTrue) {
        tempArrayData.push(rowData);
      }
      isTrue = false;
    });

    return tempArrayData;
  }
}
