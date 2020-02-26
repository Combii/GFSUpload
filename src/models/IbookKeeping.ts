export interface IBookKeepingError {
  Dato: string[];
  RegNr: string[];
  regnskabstype: string[];
  dkkbass: string[];
  skema_id: string[];
  skemarakke: string[];
  valutakod: string[];
  ldkd: string[];
  kngr: string[];
  kngr_typ: string[];
  pdst: string[];
  sum_rgopid: string[];
  opdater_lev: string[];
  leveran_kor: string[];
  leveran_type: string[];
  saldo: string[];
  Tekst: string[];
}

export interface IBookKeeping {
  Dato: string;
  RegNr: string;
  regnskabstype: string;
  dkkbass: string;
  skema_id: string;
  skemarakke: string;
  valutakod: string;
  ldkd: string;
  kngr: string;
  kngr_typ: string;
  pdst: string;
  sum_rgopid: string;
  opdater_lev: string;
  leveran_kor: string;
  leveran_type: string;
  saldo: number;
  Tekst: string;
  errors?: {};
}
