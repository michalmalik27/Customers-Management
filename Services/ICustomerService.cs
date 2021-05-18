using ServerSide.Models;
using System.Collections.Generic;

namespace CustomerManagement.Services
{
    public interface ICustomerService
    {
        public IEnumerable<Customer> GetAll();
        public Customer Get(long id);
        public void Add(Customer custimer);
    }
}
