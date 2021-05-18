using ServerSide.Models.Repository;
using System.Collections.Generic;
using System.Linq;

namespace ServerSide.Models.DataManager
{
    public class CityManager : ICityRepository
    {
        readonly CustomerContext _customerContext;
        public CityManager(CustomerContext context)
        {
            _customerContext = context;
        }

        public IEnumerable<City> GetAll()
        {
            return _customerContext.Cities.ToList();
        }
    }
}
