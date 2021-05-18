using CustomersServerSide.Models;
using System.Collections.Generic;

namespace ServerSide.Models.Repository
{
    public interface IBankRepository
    {
        IEnumerable<Bank> GetAll();

        bool IsValid(int bankNumber, int branchNumber);
    }
}
