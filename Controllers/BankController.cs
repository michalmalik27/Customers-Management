using ServerSide.Models.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using CustomerManagement.ApiErrors;

namespace ServerSide.Controller
{
    [Route("api/bank")]
    [ApiController]
    public class BankController : ControllerBase
    {
        private readonly IBankRepository _bankRepository;

        public BankController(IBankRepository bankRepository)
        {
            _bankRepository = bankRepository;
        }

        // GET: api/Bank
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var banks = _bankRepository.GetAll();
                return Ok(banks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new InternalServerError(ex.Message));
            }
        }
    }
}
