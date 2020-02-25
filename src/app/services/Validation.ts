export class Validations {
  static IsValidateDate(date: string): boolean {

    // https://stackoverflow.com/questions/10638529/how-to-parse-a-date-in-format-yyyymmdd-in-javascript
    if (!/^(\d){8}$/.test(date)) { return false; }

    const year = Number(date.toString().substring(0, 4));
    const month = Number(date.toString().substring(4, 6));
    const day = Number(date.toString().substring(6, 8));

    // console.log('Year ' + year);
    // console.log('Month ' + month);
    // console.log('Day ' + day);


    const parsedDate = new Date(year, month, day);

    // Check if sunday or saturday
    const dayOfWeek = parsedDate.getDay();

    // Saturday === 0
    // Sunday === 1
    if (dayOfWeek === 0 || dayOfWeek === 1) {
        return false;
    }




    return true;
  }
}
