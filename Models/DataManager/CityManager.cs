using ServerSide.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ServerSide.Models.DataManager
{
    public class CityManager : IDataRepository<City>
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

        public void Add(City entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(City entity)
        {
            throw new NotImplementedException();
        }

        public City Get(long id)
        {
            throw new NotImplementedException();
        }
        public void Update(City dbEntity, City entity)
        {
            throw new NotImplementedException();
        }
    }
}
