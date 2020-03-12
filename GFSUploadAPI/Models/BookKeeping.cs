    using System;
    using System.ComponentModel.DataAnnotations.Schema;

    namespace GFSUploadAPI.Models
    {
        public class BookKeeping
        {

          public BookKeeping()
          {
            CreatedDate  = DateTime.Now;
          }

          [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
          public int Id { get; set; }
          public DateTime CreatedDate { get; }
          public string Dato { get; set; }
          public string RegNr { get; set; }
          public string regnskabstype { get; set; }
          public string dkkbass { get; set; }
          public string skema_id { get; set; }
          public string skemarakke { get; set; }
          public string valutakod { get; set; }
          public string ldkd { get; set; }
          public string kngr { get; set; }
          public string kngr_typ { get; set; }
          public string pdst { get; set; }
          public string sum_rgopid { get; set; }
          public string opdater_lev { get; set; }
          public string leveran_kor { get; set; }
          public string leveran_type { get; set; }
          public string saldo { get; set; }
          public string Tekst { get; set; }
        }
    }
