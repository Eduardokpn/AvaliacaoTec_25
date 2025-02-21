using AvaliacaoTec.Server.Domain.Entities;

namespace AvaliacaoTec.Server.Application.Interfaces
{
    public interface IAlunoService
    {
        Task<List<AlunoModel>> ListarAlunos();
        Task<AlunoModel> BuscarAlunoPorId(int id);
        Task<int> AdicionarAluno(AlunoModel aluno);
        void DeletarAluno(int id);
        void AtualizarAluno(AlunoModel aluno);
        Task<List<AlunoModel>> BuscarAlunosMatriculadosAsync();
        Task<List<AlunoModel>> BuscarAlunosPorCursoAsync(int cursoId);


    }
}
