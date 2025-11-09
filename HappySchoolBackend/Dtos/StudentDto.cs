using HappySchoolBackend.Models;

namespace HappySchoolBackend.Dtos
{
    public class StudentDto
    {
        public long Id { get; set; }
        public string? FirstName { get; set; }
        public string? OtherNames { get; set; }
        public string? FullName { get; set; }
        public DateOnly BirthDate { get; set; }
        public int Age { get; set; }
        public string? ClassName { get; set; }
        public int? ClassId { get; set; }
        public IFormFile? PhotoUpload { get; set; }
        public string? PhotoBase64 { get; set; }

        // Map from entity to DTO for returning to frontend
        public static StudentDto FromEntity(Student s) => new StudentDto
        {
            Id = s.Id,
            FirstName = s.FirstName,
            OtherNames = s.OtherNames,
            FullName = s.FirstName + ' ' + s.OtherNames,
            BirthDate = s.BirthDate,
            Age = DateOnly.FromDateTime(DateTime.UtcNow).Year - s.BirthDate.Year,
            ClassName = s.Class != null ? s.Class.Name : null,
            ClassId = (int?)s.ClassId,
            PhotoBase64 = s.Photo != null ? Convert.ToBase64String(s.Photo) : null
        };
    }
}
