export class Validations {
  static IsValidateDate(date: string): boolean {

    // https://stackoverflow.com/questions/10638529/how-to-parse-a-date-in-format-yyyymmdd-in-javascript
    if (!/^(\d){8}$/.test(date)) { return false; }

    const year = Number(date.toString().substring(0, 4));
    const month = Number(date.toString().substring(4, 2));
    const day = Number(date.toString().substring(6, 2));

    const parsedDate = new Date(year, month, day);

    // Check if sunday or saturday
    const dayOfWeek = parsedDate.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
        return false;
    }




    return true;
  }
}
