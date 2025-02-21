using AvaliacaoTec.Server.Application.Interfaces;
using AvaliacaoTec.Server.Domain.Entities;
using AvaliacaoTec.Server.Domain.Interfaces;
using AvaliacaoTec.Server.Infrastructure.Data;

namespace AvaliacaoTec.Server.Application.Services
{
    public class CursoService : ICursoService
    {
        private readonly ICursoRepository _cursoRepository;
        public CursoService(ICursoRepository repository) 
        {
             _cursoRepository = repository;
        }

        public async Task<List<CursoModel>> ListarCurso()
        {
           return await _cursoRepository.GetAllAsync();
        }

        public async Task<CursoModel> BuscarCursoPorId(int id)
        {
            return await _cursoRepository.GetByIdAsync(id);
        }

        public async Task<int> AdicionarCurso(CursoModel curso)
        {
            return await _cursoRepository.AddCursoAsync(curso);
        }

        public void DeletarCurso(int id)
        {
            _cursoRepository.DeleteCursoAsync(id);
        }

        public void AtualizarCurso(CursoModel aluno)
        {
            _cursoRepository.UpdateCursoAsyc(aluno);
        }

    }
}
