using AvaliacaoTec.Server.Domain.Entities;
using AvaliacaoTec.Server.Domain.Interfaces;
using AvaliacaoTec.Server.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace AvaliacaoTec.Server.Infrastructure.Repositories
{
    public class MatriculaRepository : IMatriculaRepository
    {
        public readonly AppDbContext _context;
        public MatriculaRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<MatriculaModel>> GetAll() => await _context.Matriculas.ToListAsync();

        public async Task<MatriculaModel> GetByIdAsync(int id) => await _context.Matriculas.FirstOrDefaultAsync(x => x.Id == id);

        public async Task AddMatriculaAsync(MatriculaModel matricula)
        {
            var matriculaCadastrada = await _context.Matriculas
                .FirstOrDefaultAsync(x => x.AlunoId == matricula.AlunoId && x.CursoId == matricula.CursoId);
            if (matriculaCadastrada == null)
            {
                _context.Matriculas.Add(matricula);
                await _context.SaveChangesAsync();
                
            }
            else
            {
                throw new KeyNotFoundException("Aluno ja Matriculado Neste curso");
            }

        }

        public async Task DeleteMatriculaAsync(int id)
        {
            var matricula = await _context.Matriculas.FindAsync(id);
            
            if (matricula == null)
            {
                throw new KeyNotFoundException($"Matrícula com ID {id} não encontrada.");
            }

            _context.Remove(matricula);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteMatriculaByIdsAsync(int alunoId, int cursoId)
        {
            var matricula = await _context.Matriculas
                .FirstOrDefaultAsync(x => x.AlunoId == alunoId && x.CursoId == cursoId);

            if (matricula == null)
            {
                throw new KeyNotFoundException("Matrícula não encontrada.");
            }

            _context.Matriculas.Remove(matricula);
            await _context.SaveChangesAsync();
        }


    }
}
