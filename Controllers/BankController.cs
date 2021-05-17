using ServerSide.Models.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using CustomersServerSide.Models;

namespace ServerSide.Controller
{
    [Route("api/bank")]
    [ApiController]
    public class BankController : ControllerBase
    {
        private readonly IBankRepository<Bank> _bankRepository;

        public BankController(IBankRepository<Bank> bankRepository)
        {
            _bankRepository = bankRepository;
        }

        // GET: api/Bank
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var customers = _bankRepository.GetAll();
                return Ok(customers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
