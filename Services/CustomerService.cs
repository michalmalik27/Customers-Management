using ServerSide.Models;
using ServerSide.Models.Repository;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace CustomerManagement.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IBankRepository _bankRepository;

        public CustomerService(ICustomerRepository customerRepository, IBankRepository bankRepository)
        {
            _customerRepository = customerRepository;
            _bankRepository = bankRepository;
        }

        public void Add(Customer customer)
        {
            if (Get(customer.IdNumber) != null)
                throw new Exception("Customer already exists");

            if (!Validate(customer, out ICollection<ValidationResult> results))
                throw new Exception(string.Join("\n", results.Select(o => o.ErrorMessage)));

            if (!_bankRepository.IsValid(customer.BankNumber, customer.BankBranch))
                throw new Exception("Bank details not valid");

            _customerRepository.Add(customer);
        }

        public Customer Get(long id)
        {
            return _customerRepository.Get(id);
        }

        public IEnumerable<Customer> GetAll()
        {
            return _customerRepository.GetAll();
        }

        static bool Validate<T>(T obj, out ICollection<ValidationResult> results)
        {
            results = new List<ValidationResult>();

            return Validator.TryValidateObject(obj, new ValidationContext(obj), results, true);
        }
    }
}
