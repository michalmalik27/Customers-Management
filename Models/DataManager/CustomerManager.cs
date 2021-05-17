using Microsoft.EntityFrameworkCore;
using ServerSide.Models.Repository;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace ServerSide.Models.DataManager
{
    public class CustomerManager : IDataRepository<Customer>
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
            if (Get(entity.IdNumber) != null)
                throw new Exception("Customer already exists");

            if (!Validate(entity, out ICollection<ValidationResult> results))
                throw new Exception(string.Join("\n", results.Select(o => o.ErrorMessage)));

            _customerContext.Customers.Add(entity);
            _customerContext.SaveChanges();
        }

        public void Update(Customer customer, Customer entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(Customer customer)
        {
            throw new NotImplementedException();
        }

        static bool Validate<T>(T obj, out ICollection<ValidationResult> results)
        {
            results = new List<ValidationResult>();

            return Validator.TryValidateObject(obj, new ValidationContext(obj), results, true);
        }     
    }
}
