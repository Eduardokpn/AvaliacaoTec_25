using AvaliacaoTec.Server.Domain.Entities;

namespace AvaliacaoTec.Server.Domain.Interfaces
{
    public interface IMatriculaRepository
    {
        Task<List<MatriculaModel>> GetAll();
        Task<MatriculaModel> GetByIdAsync(int id);
        Task AddMatriculaAsync(MatriculaModel matricula);
        Task DeleteMatriculaAsync(int id);
        Task DeleteMatriculaByIdsAsync(int alunoId, int cursoId);

    }
}
