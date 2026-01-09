using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class Student
    {
        public int Id { get; set; }
        [Required]
        [StringLength(80)]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        [StringLength (100)]
        public string Email { get; set; }
        [StringLength(20)]
        public string PhoneNumber { get; set; }
        [Required]
        public byte Age { get; set; }
    }
}
