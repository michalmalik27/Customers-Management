using Microsoft.AspNetCore.Mvc;
using ServerSide.Models;
using ServerSide.Models.Repository;


namespace ServerSide.Controllers
{
    [Route("api/city")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly IDataRepository<City> _dataRepository;
        public CityController(IDataRepository<City> dataRepository)
        {
            _dataRepository = dataRepository;
        }
        [HttpGet]
        public IActionResult GetAllCities()
        {
            try
            {
                var cities = _dataRepository.GetAll();
                return Ok(cities);
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
