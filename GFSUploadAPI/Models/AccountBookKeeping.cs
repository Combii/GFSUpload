    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    namespace GFSUploadAPI.Models
    {
        public class AccountBookKeeping
        {
          public AccountBookKeeping()
          {
            CreatedDate  = DateTime.Now;
          }

            [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
            public int Id { get; set; }
            public DateTime CreatedDate { get; }
            public string AccountingDate { get; set; }
            public string RegistrationNo { get; set; }
            public string Currency { get; set; }
            public string IDKT { get; set; }
            public string OriginalIDKT { get; set; }
            public string CounterAccountIDKT { get; set; }
            public string ProjectCode { get; set; }
            public string Balance { get; set; }
            public string Text { get; set; }
        }
    }
