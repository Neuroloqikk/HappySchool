using Microsoft.EntityFrameworkCore;
using HappySchoolBackend.Models;

namespace HappySchoolBackend.Models
{
    public class SchoolContext : DbContext
    {
        public SchoolContext(DbContextOptions<SchoolContext> options)
            : base(options) { }

        public DbSet<Student> Students { get; set; } = null!;
        public DbSet<HappySchoolBackend.Models.Class> Class { get; set; } = default!;
    }
}
