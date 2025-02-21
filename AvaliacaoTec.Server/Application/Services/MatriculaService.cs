using AvaliacaoTec.Server.Application.Interfaces;
using AvaliacaoTec.Server.Domain.Entities;
using AvaliacaoTec.Server.Domain.Interfaces;
using AvaliacaoTec.Server.Infrastructure.Repositories;

namespace AvaliacaoTec.Server.Application.Services
{
    public class MatriculaService : IMatriculaService
    {
        private readonly IMatriculaRepository _mRepository;
        public MatriculaService(IMatriculaRepository mRepository)
        {
            _mRepository = mRepository;
        }

        public async Task<List<MatriculaModel>> ListarMatricula()
        {
            return await _mRepository.GetAll();
        }
        public async Task<MatriculaModel> BuscarMatriculaId(int id)
        {
            return await _mRepository.GetByIdAsync(id);
        }

        public async Task AdicionarMatricula(MatriculaModel matricula)
        {
            await _mRepository.AddMatriculaAsync(matricula);
        }
        public async Task DeletarMatricula(int id)
        {
            await _mRepository.DeleteMatriculaAsync(id);

        }

        public async Task DeletarMatriculaAlunoECursoAsync(int alunoId, int cursoId)
        {

            await _mRepository.DeleteMatriculaByIdsAsync(alunoId, cursoId);

        }


    }
}
