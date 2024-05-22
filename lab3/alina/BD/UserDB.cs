using alina.DataBase;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace alina.BD
{
    public class UserDB
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public string? Patronymic { get; set; }
        public string? Description { get; set; }
        public string? ImgName { get; set; }
        [property: Required]
        public DateOnly Birthday { get; set; }
        public ContactDB? Contact { get; set; }

    }
}
