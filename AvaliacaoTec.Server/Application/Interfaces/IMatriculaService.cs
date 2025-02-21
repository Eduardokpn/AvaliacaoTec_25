using AvaliacaoTec.Server.Domain.Entities;

namespace AvaliacaoTec.Server.Application.Interfaces
{
    public interface IMatriculaService
    {
        Task<List<MatriculaModel>> ListarMatricula();
        Task<MatriculaModel> BuscarMatriculaId(int id);
        Task AdicionarMatricula(MatriculaModel matricula);
        Task DeletarMatricula(int id);
        Task DeletarMatriculaAlunoECursoAsync(int alunoId, int cursoId);
    }
}
