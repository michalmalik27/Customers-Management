using System.Collections.Generic;

namespace ServerSide.Models.Repository
{
    public interface IBankRepository<Bank>
    {
        IEnumerable<Bank> GetAll();
        bool IsValid(int bankNumber, int branchNumber);
    }
}
