export class User {
    constructor(
        public userName: string,
        public id: string,
        private _token: string,
        private _expirationDate: Date
    ) {}

    get token() {
        if(!this._expirationDate || new Date() > this._expirationDate) {
            return null;
        }
        return this._token
    }
}