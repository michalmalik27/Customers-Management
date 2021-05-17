using Microsoft.EntityFrameworkCore;

namespace ServerSide.Models
{
    public class CustomerContext : DbContext
    {
        public CustomerContext(DbContextOptions options)
            : 
            
            base(options)
        {
        }

        public DbSet<City> Cities { get; set; }
        public DbSet<Customer> Customers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<City>().HasData(new City
            {
                CityId = 1,
                CityName = "Jerusalem",
            }, new City
            {
                CityId = 2,
                CityName = "Tel-Aviv",
            }, new City
            {
                CityId = 3,
                CityName = "Modiin",
            }, new City
            {
                CityId = 4,
                CityName = "Petah-Tikva",
            }, new City
            {
                CityId = 5,
                CityName = "Eilat",
            });

            //modelBuilder.Entity<Customer>();
            //{
            //    CustomerId = 1,
            //    IdNumber = 204308803,
            //    CityId = 3,
            //    DateOfBirth = new DateTime(year: 1994, month: 4, day: 5),
            //    CustomerHebName = "מיכל מליק",
            //    CustomerEngName = "Michal Malik",
            //    AccountingNumber = 123456,
            //    BankNumber = 31,
            //    BankBranch = 128
            //});
        }
    }
}
