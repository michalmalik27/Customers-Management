using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CustomersServerSide.Models
{
    [NotMapped]
    public class BankDataApiResult
    {
        public string Status { get; set; }
        public int Code { get; set; }
        public BankData Data { get; set; }
    }

    [NotMapped]
    public class BankData
    {
        public IEnumerable<Bank> Banks { get; set; }
        public IEnumerable<BankBranche> BankBranches { get; set; }
    }

    [NotMapped]
    public class Bank
    {
        public int Code { get; set; }
        public bool Status { get; set; }
        public string Description { get; set; }
        public List<int> Branches { get; set; }

        public Bank()
        {
            Branches = new List<int>();
        }
    }

    [NotMapped]
    public class BankBranche
    {
        public int BankCode{ get; set; }
        public int BranchNumber { get; set; }
    }
}
