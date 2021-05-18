using Microsoft.AspNetCore.Mvc;
using ServerSide.Models.Repository;


namespace ServerSide.Controllers
{
    [Route("api/city")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ICityRepository _cityRepository;
        public CityController(ICityRepository cityRepository)
        {
            _cityRepository = cityRepository;
        }
        [HttpGet]
        public IActionResult GetAllCities()
        {
            try
            {
                var cities = _cityRepository.GetAll();
                return Ok(cities);
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
