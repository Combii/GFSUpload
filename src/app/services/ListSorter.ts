import { IBookKeeping } from 'src/models/IbookKeeping';
import { IExcelBookKeeping } from 'src/models/IExcelBookKeeping';

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

  static sortListForErrorsOnlyIExcelBookKeeping(listBookKeeping: IExcelBookKeeping[]): IExcelBookKeeping[] {
    let isTrue = false;
    const tempArrayData: IExcelBookKeeping[] = [];

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
