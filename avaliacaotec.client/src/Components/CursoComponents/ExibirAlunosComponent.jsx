import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

export default function AlunosPorCursoModal({ isOpen, setIsOpen, cursoId }) {
    const [alunos, setAlunos] = useState([]);
    const [cursos, setCursos] = useState([]);
    const excluirAluno = async (id, cursoId) => {
        const url = `https://avaliacaotec-g9g3fpavb3f6hzhg.brazilsouth-01.azurewebsites.net/api/Matricula/DelMatriculaPorIdAluno/${id}/${cursoId}`;
        const confirmacao = window.confirm("Deseja realmente excluir este item?");
        if (confirmacao) {
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Erro ao excluir aluno.");
            }

            setAlunos(alunos.filter(aluno => aluno.id !== id));
            setCursos(cursos.filter(curso => curso.id !== cursoId));

        } catch (error) {
            console.error("Erro ao excluir aluno:", error);
            alert("Erro possível excluir o aluno.");
            }
        }
    };

    useEffect(() => {
        if (isOpen && cursoId) {
            const fetchAlunos = async () => {
                try {
                    const response = await fetch(`https://avaliacaotec-g9g3fpavb3f6hzhg.brazilsouth-01.azurewebsites.net/api/Aluno/AlunoPorCurso/${cursoId}`)
                    if (!response.ok) throw new Error("Erro ao buscar alunos.");

                    const data = await response.json();
                    setAlunos(data);
                } catch (error) {
                    console.error("Erro ao buscar alunos:", error);
                }
            };

            fetchAlunos();
        }
    }, [isOpen, cursoId]);

    if (!isOpen) return null; 

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Alunos do Curso <span>{cursoId.nome}</span></h2>

                {alunos.length > 0 ? (
                    <ul className="space-y-2">
                        {alunos.map((aluno) => (
                            <li key={aluno.id} className="p-2 border rounded flex justify-contetn-between items-center">
                                <span>{aluno.nome} - {aluno.email}</span>
                                <button
                                    onClick={() => excluirAluno(aluno.id, cursoId)}
                                    className="btn btn-danger px-2 py-1 bg-red-500 text-white rounded text-sm"
                                    style={{ marginLeft: '20px' }}
                                >
                                    Excluir
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">Nenhum aluno encontrado para este curso.</p>
                )}

                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setIsOpen(false)} className="btn btn-outline-secondary  px-4 py-2 bg-gray-300 rounded">
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}

AlunosPorCursoModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    cursoId: PropTypes.number
};
