using AvaliacaoTec.Server.Domain.Entities;
using AvaliacaoTec.Server.Domain.Interfaces;
using AvaliacaoTec.Server.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace AvaliacaoTec.Server.Infrastructure.Repositories
{
    public class AlunoRepository : IAlunoRepository
    {
        private readonly AppDbContext _context;
        public AlunoRepository(AppDbContext context)
        {
            _context = context;

        }

        public async Task<List<AlunoModel>> GetAll() => await _context.Alunos.ToListAsync();

        public async Task<AlunoModel> GetByIdAluno(int id) => await _context.Alunos.FirstOrDefaultAsync(x => x.Id == id);

        public async Task<int> AddAlunoAsync(AlunoModel aluno)
        {
          _context.Alunos.Add(aluno);
          _context.SaveChanges();
          return aluno.Id;

        }

        public async void DeleteAlunoAsync(int id)
        {
            var aluno = await _context.Alunos.FindAsync(id);
            _context.Alunos.Remove(aluno);
            _context.SaveChanges();
        }

        public async void UpdateAlunoAsyc(AlunoModel aluno)
        {
            _context.Alunos.Update(aluno);
            _context.SaveChangesAsync();

        }

        public async Task<List<AlunoModel>> BuscarAlunosMatriculadosAsync()
        {
            return await _context.Matriculas
                .Select(m => m.AlunoId)
                .Distinct()
                .Join(_context.Alunos, matricula => matricula, aluno => aluno.Id, (matricula, aluno) => aluno)
                .ToListAsync();
        }

        public async Task<List<AlunoModel>> BuscarAlunosPorCursoAsync(int cursoId)
        {
            return await _context.Matriculas
                .Where(m => m.CursoId == cursoId)
                .Join(_context.Alunos, matricula => matricula.AlunoId, aluno => aluno.Id, (matricula, aluno) => aluno)
                .ToListAsync();
        }





    }
}
