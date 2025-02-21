using AvaliacaoTec.Server.Application.Interfaces;
using AvaliacaoTec.Server.Application.Services;
using AvaliacaoTec.Server.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace AvaliacaoTec.Server.Controllers
{
    [ApiController]
    [Route("api/Matricula")]
    public class MatriculaController : ControllerBase
    {
        private readonly IMatriculaService _matriculaService;
        public MatriculaController(IMatriculaService matriculaService)
        {
            _matriculaService = matriculaService;
        }

        [HttpGet("GetMatricula")]
        public async Task<IActionResult> ListagemMatricula()
        {
            var matriculas = await _matriculaService.ListarMatricula();
            return Ok(matriculas);
        }

        [HttpGet("BuscarId/{id}")]
        public async Task<IActionResult> BuscarMatricula(int id)
        {
            var matricula = await _matriculaService.BuscarMatriculaId(id);
            return Ok(matricula);
        }

        [HttpPost("AdicionarMatricula")]
        public async Task<IActionResult> AdicionarMatricula([FromBody] MatriculaModel matricula)
        {
            await _matriculaService.AdicionarMatricula(matricula);
            return Ok(matricula);
        }

        [HttpDelete("DelMatricula/{id}")]
        public async Task<IActionResult> DeletarAluno(int id)
        {
            await _matriculaService.DeletarMatricula(id);
            return NoContent();

        }

        [HttpDelete("DelMatriculaPorIdAluno/{alunoId}/{cursoId}")]
        public async Task<IActionResult> DeletarMatriculaPorId(int alunoId, int cursoId)
        {
             await _matriculaService.DeletarMatriculaAlunoECursoAsync(alunoId, cursoId); 
            return NoContent();

        }


    }
}
