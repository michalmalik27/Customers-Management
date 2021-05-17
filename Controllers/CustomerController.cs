using ServerSide.Models;
using ServerSide.Models.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using CustomersServerSide.Models;

namespace ServerSide.Controller
{
    [Route("api/customer")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly IDataRepository<Customer> _dataRepository;
        private readonly IBankRepository<Bank> _bankRepository;

        public CustomerController(
            IDataRepository<Customer> dataRepository, 
            IBankRepository<Bank> bankRepository)
        {
            _dataRepository = dataRepository;
            _bankRepository = bankRepository;
        }

        // GET: api/Customer
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var customers = _dataRepository.GetAll();
                return Ok(customers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }
        // GET: api/Customer/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(long id)
        {
            try
            {
                Customer customer = _dataRepository.Get(id);
                if (customer == null)
                {
                    return NotFound("The Customer record couldn't be found.");
                }
                return Ok(customer);
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        // POST: api/Customer
        [HttpPost]
        public IActionResult Post([FromBody] Customer customer)
        {
            try
            {
                if (customer == null)
                {
                    return BadRequest("Customer is null.");
                }

                if (!_bankRepository.IsValid(customer.BankNumber, customer.BankBranch))
                    return StatusCode(500, "Bank details not valid");

                _dataRepository.Add(customer);
                return CreatedAtRoute(
                      "Get",
                      new { Id = customer.CustomerId },
                      customer);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
