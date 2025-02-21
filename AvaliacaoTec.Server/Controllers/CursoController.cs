using AvaliacaoTec.Server.Application.Interfaces;
using AvaliacaoTec.Server.Application.Services;
using AvaliacaoTec.Server.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace AvaliacaoTec.Server.Controllers
{
    [ApiController]
    [Route("api/Curso")]
    public class CursoController : ControllerBase
    {
        private readonly ICursoService _cursoService;
        public CursoController(ICursoService cursoService)
        {
            _cursoService = cursoService;
        }

        [HttpGet("GetCursos")]
        public async Task<IActionResult> ListagemCurso()
        {
            var cursos = await _cursoService.ListarCurso();
            return Ok(cursos);
        }

        [HttpGet("BuscarId/{id}")]
        public async Task<IActionResult> BuscarCurso(int id)
        {
            var aluno = await _cursoService.BuscarCursoPorId(id);
            return Ok(aluno);
        }

        [HttpPost("AdicionarCurso")]
        public async Task<IActionResult> AdicionarCurso([FromBody] CursoModel curso)
        {
            await _cursoService.AdicionarCurso(curso);
            return Ok(curso);
        }

        [HttpDelete("DelCurso/{id}")]
        public async Task<IActionResult> DeletarAluno(int id)
        {
            var curso = await _cursoService.BuscarCursoPorId(id);

            _cursoService.DeletarCurso(id);
            return Ok(curso.Nome);

        }

        [HttpPut("Atualizar/{id}")]
        public async Task<IActionResult> AtualizarAluno(CursoModel curso)
        {
            _cursoService.AtualizarCurso(curso);
            return Ok(curso);

        }

    }
}
