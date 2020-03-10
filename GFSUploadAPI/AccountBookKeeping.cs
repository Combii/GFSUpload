using System;

namespace GFSUploadAPI
{
    public class AccountBookKeeping
    {
        public int AccountingDate { get; set; }
        public string RegistrationNo { get; set; }
        public string IDKT { get; set; }
        public string OriginalIDKT { get; set; }
        public string CounterAccountIDKT { get; set; }
        public string Text { get; set; }
        public string ProjectCode { get; set; }
        public string Currency { get; set; }
        public float Balance { get; set; }
    }
}
