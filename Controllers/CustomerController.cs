using ServerSide.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using CustomerManagement.Services;

namespace ServerSide.Controller
{
    [Route("api/customer")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;
        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        // GET: api/Customer
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var customers = _customerService.GetAll();
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
                Customer customer = _customerService.Get(id);
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

                _customerService.Add(customer);
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
