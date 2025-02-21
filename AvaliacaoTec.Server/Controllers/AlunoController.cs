using AvaliacaoTec.Server.Application.Interfaces;
using AvaliacaoTec.Server.Application.Services;
using AvaliacaoTec.Server.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace AvaliacaoTec.Server.Controllers
{

    [ApiController]
    [Route("api/Aluno")]
    public class AlunoController : ControllerBase
    {
        private readonly IAlunoService _alunoService;

        public AlunoController(IAlunoService alunoService)
        {
            _alunoService = alunoService;
        }

        [HttpGet("GetAlunos")]
        public async Task<IActionResult> ListagemAlunos()
        {
            var alunos = await _alunoService.ListarAlunos();
            return Ok(alunos);
        }

        [HttpGet("BuscarId/{id}")]
        public async Task<IActionResult> BuscarAluno(int id)
        {
            var aluno = await _alunoService.BuscarAlunoPorId(id);
            return Ok(aluno);
        }

        [HttpPost("AdicionarAluno")]
        public async Task<IActionResult> AdcionarAluno([FromBody] AlunoModel aluno)
        {
            await _alunoService.AdicionarAluno(aluno);
            return Ok(aluno);

        }

        [HttpDelete("DelAluno/{id}")]
        public async Task<IActionResult> DeletarAluno(int id)
        {
            var aluno = await _alunoService.BuscarAlunoPorId(id);

            _alunoService.DeletarAluno(id);
            return Ok(aluno.Nome);

        }

        [HttpPut("Atualizar/{id}")]
        public async Task<IActionResult> AtualizarAluno(AlunoModel aluno)
        {
            _alunoService.AtualizarAluno(aluno);
            return Ok(aluno);

        }

        [HttpGet("matriculados")]
        public async Task<IActionResult> BucarMatriculaAlunos()
        {
            var alunosM = await _alunoService.BuscarAlunosMatriculadosAsync();
            return Ok(alunosM);
        }

        [HttpGet("AlunoPorCurso/{cursoId}")]
        public async Task<IActionResult> AlunosPorCurso(int cursoId)
        {
            var alunosDoCurso = await _alunoService.BuscarAlunosPorCursoAsync(cursoId);
            return Ok(alunosDoCurso);
        }






    }
}
