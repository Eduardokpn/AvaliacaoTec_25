import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

export default function AddMatriculaComponent({ isOpen, setIsOpen, alunoId, alunoNome }) {
    const [cursos, setCursos] = useState([]);
    const [selectedCurso, setSelectedCurso] = useState("");

    // Busca os cursos da API quando o modal abre
    useEffect(() => {
        async function fetchCursos() {
            try {
                const response = await fetch("https://avaliacaotec-g9g3fpavb3f6hzhg.brazilsouth-01.azurewebsites.net/api/Curso/GetCursos");
                if (!response.ok) {
                    throw new Error("Erro ao buscar cursos.");
                }
                const data = await response.json();
                setCursos(data);
            } catch (error) {
                console.error("Erro ao buscar cursos:", error);
            }
        }

        if (isOpen) {
            fetchCursos();
        }
    }, [isOpen]);

    // Envia a matrícula para a API
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedCurso) {
            alert("Selecione um curso antes de continuar.");
            return;
        }

        try {
            const response = await fetch("https://avaliacaotec-g9g3fpavb3f6hzhg.brazilsouth-01.azurewebsites.net/api/Matricula/AdicionarMatricula", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ alunoId, cursoId: selectedCurso })
            });

            if (!response.ok) {
                throw new Error("Erro ao realizar matrícula.");
            }

            alert("Aluno matriculado com sucesso");
            setIsOpen(false);
        } catch (error) {
            console.error("Erro ao realizar matrícula:", error);
            alert("Erro ao realizar a matrícula.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                {/* Exibe o nome do aluno no título */}
                <h2 className="text-xl font-bold mb-4">Matricula de {alunoNome}</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <label className="font-medium">Selecione um curso:   </label>
                    <select
                        value={selectedCurso}
                        onChange={(e) => setSelectedCurso(e.target.value)}
                        className="p-2 border rounded"
                        required
                    >
                        <option value="" disabled>Selecione um curso</option>
                        {cursos.map((curso) => (
                            <option key={curso.id} value={curso.id}>{curso.nome}</option>
                        ))}
                    </select>

                    <div className="flex justify-end gap-2 mt-4">
                        <button type="button" onClick={() => setIsOpen(false)} className="btn btn-outline-secondary px-4 py-2 bg-gray-300 rounded">
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-outline-success px-4 py-2 bg-blue-500 text-green rounded">
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

AddMatriculaComponent.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    alunoId: PropTypes.string.isRequired,
    alunoNome: PropTypes.string.isRequired 
};
