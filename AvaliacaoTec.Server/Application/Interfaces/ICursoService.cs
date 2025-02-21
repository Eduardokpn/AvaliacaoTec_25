using AvaliacaoTec.Server.Domain.Entities;

namespace AvaliacaoTec.Server.Application.Interfaces
{
    public interface ICursoService
    {
        Task<List<CursoModel>> ListarCurso();
        Task<CursoModel> BuscarCursoPorId(int id);
        Task<int> AdicionarCurso(CursoModel aluno);
        void DeletarCurso(int id);
        void AtualizarCurso(CursoModel aluno);
    }
}
