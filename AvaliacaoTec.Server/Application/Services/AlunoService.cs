using AvaliacaoTec.Server.Application.Interfaces;
using AvaliacaoTec.Server.Domain.Entities;
using AvaliacaoTec.Server.Domain.Interfaces;
using System.Globalization;

namespace AvaliacaoTec.Server.Application.Services
{
    public class AlunoService : IAlunoService
    {
        private readonly IAlunoRepository _alunoRepository;

        public AlunoService(IAlunoRepository alunoRepository)
        {
            _alunoRepository = alunoRepository;

        }

        public async Task<List<AlunoModel>> ListarAlunos()
        {
            return await _alunoRepository.GetAll();
        }

        public async Task<AlunoModel> BuscarAlunoPorId(int id)
        {
            return await _alunoRepository.GetByIdAluno(id);
        }

        public async Task<int> AdicionarAluno(AlunoModel aluno)
        {
            if (!DateTime.TryParseExact(aluno.DataNascimento, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime dataNascimento))
                throw new Exception("Data de nascimento inválida. Use o formato yyyy-MM-dd.");

            if (dataNascimento > DateTime.UtcNow.AddYears(-18))
                throw new Exception("O aluno deve ser maior de idade.");

            return await _alunoRepository.AddAlunoAsync(aluno);
        }
        public void DeletarAluno(int id)
        {
            _alunoRepository.DeleteAlunoAsync(id);
        }

        public void AtualizarAluno(AlunoModel aluno)
        {
            _alunoRepository.UpdateAlunoAsyc(aluno);
        }

        public async Task<List<AlunoModel>> BuscarAlunosMatriculadosAsync()
        {
            return await _alunoRepository.BuscarAlunosMatriculadosAsync();
        }
        public async Task<List<AlunoModel>> BuscarAlunosPorCursoAsync(int cursoId)
        {
            return await _alunoRepository.BuscarAlunosPorCursoAsync(cursoId);
        }






    }
}
