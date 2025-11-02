namespace HappySchoolBackend.Models
{
    public class Student
    {
        public long Id { get; set; }
        public string? FirstName { get; set; }
        public string? OtherNames { get; set; }
        public DateTime BirthDate { get; set; }
        public long? ClassId { get; set; }
        public Class? Class { get; set; }
        public byte[]? Photo { get; set; }
    }
}
