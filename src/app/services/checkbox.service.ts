import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CheckboxService {
  uploadToGfs = false;
  bookInFebos = false;
  bookInFebosAndUploadToGfs = false;

  constructor() {}
}
