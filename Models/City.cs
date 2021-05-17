using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerSide.Models
{
    public class City
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CityId { get; set; }

        [Required(ErrorMessage = "City name is required")]
        [MaxLength(50)]
        public string CityName { get; set; }

        public ICollection<Customer> Customers { get; set; }
    }
}
