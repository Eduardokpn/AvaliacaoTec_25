using AvaliacaoTec.Server.Domain.Entities;

namespace AvaliacaoTec.Server.Domain.Interfaces
{
    public interface IAlunoRepository
    {
        Task<List<AlunoModel>> GetAll();
        Task<AlunoModel> GetByIdAluno(int id);
        Task<int> AddAlunoAsync(AlunoModel aluno);
        void DeleteAlunoAsync(int id);
        void UpdateAlunoAsyc(AlunoModel aluno);
        Task<List<AlunoModel>> BuscarAlunosMatriculadosAsync();
        Task<List<AlunoModel>> BuscarAlunosPorCursoAsync(int cursoId);



    }
}
