using AvaliacaoTec.Server.Domain.Entities;
using AvaliacaoTec.Server.Domain.Interfaces;
using AvaliacaoTec.Server.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace AvaliacaoTec.Server.Infrastructure.Repositories
{
    public class CursoRepository : ICursoRepository
    {
        private readonly AppDbContext _context;
        public CursoRepository(AppDbContext context)
        {
            _context = context;
        
        }
        public async Task<List<CursoModel>> GetAllAsync() => await _context.Cursos.ToListAsync();

        public async Task<CursoModel> GetByIdAsync(int id)  => await _context.Cursos.FirstOrDefaultAsync(x => x.Id == id);

        public async Task<int> AddCursoAsync(CursoModel curso)
        {
            _context.Cursos.Add(curso);
            _context.SaveChanges();
            return curso.Id;

        }

        public async void DeleteCursoAsync(int id)
        {
            var curso = await _context.Cursos.FindAsync(id);

             _context.Cursos.Remove(curso);
            _context.SaveChanges();

        }

        public async void UpdateCursoAsyc(CursoModel curso)
        {
            _context.Cursos.Update(curso);
            _context.SaveChanges();
        }

        /*
        Task<CursoModel> GetByIdAsync(int id);
        Task AddCursoAsync(CursoModel curso);
        Task DeleteCursoAsync(int id);
        Task UpdateCursoAsyc(int id);
        */
    }
}
