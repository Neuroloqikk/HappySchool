using HappySchoolBackend.Models;

namespace HappySchoolBackend.Dtos
{
    public class StudentDto
    {
        public long Id { get; set; }
        public string? FirstName { get; set; }
        public string? OtherNames { get; set; }
        public DateTime BirthDate { get; set; }
        public string? ClassName { get; set; }
        public int? ClassId { get; set; }
        public byte[]? Photo { get; set; }

        public static StudentDto FromEntity(Student s) => new StudentDto
        {
            Id = s.Id,
            FirstName = s.FirstName,
            OtherNames = s.OtherNames,
            BirthDate = s.BirthDate,
            ClassName = s.Class != null ? s.Class.Name : null,
            Photo = s.Photo
        };
    }
}
