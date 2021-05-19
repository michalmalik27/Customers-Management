using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ServerSide.Models
{
    public class Customer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CustomerId { get; set; }

        [RegularExpression(@"^\d{9}$", ErrorMessage = "Id Number not valid")]
        [Required(ErrorMessage = "ID Number is required")]
        public int IdNumber { get; set; }

        [RegularExpression(@"^[א-ת''-'\s]{1,20}$", ErrorMessage = "Hebrew name contains not allowed characters")]
        [Required(ErrorMessage = "Hebrew name is required")]
        [StringLength(20, ErrorMessage = "Hebrew name can't be longer than 20 characters")]
        public string CustomerHebName { get; set; }

        [RegularExpression(@"^[a-zA-Z''-'\s]{1,15}$", ErrorMessage = "English name contains not allowed characters")]
        [Required(ErrorMessage = "English name is required")]
        [StringLength(15, ErrorMessage = "English name can't be longer than 15 characters")]
        public string CustomerEngName { get; set; }

        [Required(ErrorMessage = "Date of birth is required")]
        public DateTime DateOfBirth { get; set; }

        [Required(ErrorMessage = "City is required")]
        public int CityId { get; set; }

        [JsonIgnore]
        public City City { get; set; }

        [Required(ErrorMessage = "Bank number is required")]
        public int BankNumber { get; set; }

        [Required(ErrorMessage = "Bank branch is required")]
        public int BankBranch { get; set; }

        [RegularExpression(@"^\d{1,10}$")]
        [Required(ErrorMessage = "Accounting number is required")]
        public int AccountingNumber { get; set; }

        [NotMapped]
        public string CityName => City?.CityName;
    }
}
