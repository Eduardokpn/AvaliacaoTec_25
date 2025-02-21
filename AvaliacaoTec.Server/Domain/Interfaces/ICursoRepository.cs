using AvaliacaoTec.Server.Domain.Entities;

namespace AvaliacaoTec.Server.Domain.Interfaces
{
    public interface ICursoRepository
    {
        Task<List<CursoModel>> GetAllAsync();
        Task<CursoModel> GetByIdAsync(int id);
        Task<int> AddCursoAsync(CursoModel curso);
        void DeleteCursoAsync(int id);
        void UpdateCursoAsyc(CursoModel curso);

    }
}
