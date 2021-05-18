using Microsoft.EntityFrameworkCore;
using ServerSide.Models.Repository;
using System.Collections.Generic;
using System.Linq;

namespace ServerSide.Models.DataManager
{
    public class CustomerManager : ICustomerRepository
    {
        readonly CustomerContext _customerContext;

        public CustomerManager(CustomerContext context)
        {
            _customerContext = context;
        }
        public IEnumerable<Customer> GetAll()
        {
            return _customerContext.Customers
                .Include(c => c.City)
                .ToList();
        }

        public Customer Get(long id)
        {
            return _customerContext.Customers
                .Include(c => c.City)
                .FirstOrDefault(c => c.IdNumber == id);
        }

        public void Add(Customer entity)
        {
            _customerContext.Customers.Add(entity);
            _customerContext.SaveChanges();
        }
    }
}
