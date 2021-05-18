using System.Collections.Generic;

namespace ServerSide.Models.Repository
{
    public interface ICityRepository
    {
        IEnumerable<City> GetAll();
    }
}
