using AvaliacaoTec.Server.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AvaliacaoTec.Server.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<AlunoModel> Alunos { get; set; }
        public DbSet<CursoModel> Cursos { get; set; }
        public DbSet<MatriculaModel> Matriculas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MatriculaModel>()
                .HasKey(m => m.Id);

            modelBuilder.Entity<MatriculaModel>()
                .HasOne<AlunoModel>()
                .WithMany()
                .HasForeignKey(m => m.AlunoId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MatriculaModel>()
                .HasOne<CursoModel>()
                .WithMany()
                .HasForeignKey(m => m.CursoId)
                .OnDelete(DeleteBehavior.Cascade);
        }


    }
}
