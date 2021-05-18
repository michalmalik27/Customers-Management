using System.Collections.Generic;

namespace ServerSide.Models.Repository
{
    public interface ICustomerRepository
    {
        IEnumerable<Customer> GetAll();
        Customer Get(long id);
        void Add(Customer entity);
    }
}
