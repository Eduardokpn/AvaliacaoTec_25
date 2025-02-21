import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddCursoComponent from './AddCursoComponent';
import EditarCursoModal from './EditModelCurso';
import AlunosPorCursoModal from './ExibirAlunosComponent';

function CursoListComponent() {
    const [cursos, setCurso] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModallOpen, setEditModalOpen] = useState(false);
    const [isViewModallOpen, setViewModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [cursoSelecionado, setCursoSelecionado] = useState(null);

    const excluirCurso = async (id) => {
        const url = `https://avaliacaotec-g9g3fpavb3f6hzhg.brazilsouth-01.azurewebsites.net/api/Curso/DelCurso/${id}`;
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
                throw new Error("Erro ao excluir curso.");
            }
            
            setCurso(cursos.filter(curso => curso.id !== id)); 

        } catch (error) {
            console.error("Erro ao excluir aluno:", error);
            alert("Erro ao excluir o aluno.");
            }
        }
    };

    const handleEditClick = (curso) => {
        setCursoSelecionado(curso);
        setEditModalOpen(true);
    };

    const abrirModalView = (cursoId) => {
        setCursoSelecionado(cursoId);
        setViewModalOpen(true);
    };

    const atualizarListaEditCurso = (cursoAtualizado) => {
        setCurso(cursos.map(curso =>
            curso.id === cursoAtualizado.id ? cursoAtualizado : curso
        ));
    };

    const handleCursoRecebido = async (novoCurso) => {
        try {

            setCurso(prevCursos => {
                const alunoExiste = prevCursos.some(curso => curso.id === novoCurso.id);

                if (alunoExiste) {
                    console.warn("Aluno já existe e não será atualizado.");
                    return prevCursos;
                }
                return [...prevCursos, novoCurso];
            });

        } catch (error) {
            console.error("Erro ao processar os dados do aluno:", error);
        }
    };


    useEffect(() => {
        fetch('https://avaliacaotec-g9g3fpavb3f6hzhg.brazilsouth-01.azurewebsites.net/api/Curso/GetCursos')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar os Cursos');
                }
                return response.json();
            })
            .then((data) => {
                setCurso(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Erro: {error}</p>;
    }

    return (
        <div className="container" style={{ padding: '20px' }}>
            <div className="d-flex justify-content-between">
                <h2 className="mb-4">Lista de Cursos</h2>
                <div className="p-6">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 btn btn-success">
                        Adicionar Curso
                    </button>
                </div>
            </div>

            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descricao</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cursos.map(curso => (
                        <tr key={curso.id}>
                            <td>{curso.id}</td>
                            <td style={{ textDecoration: "underline" }}  onClick={() => abrirModalView(curso.id)}>{curso.nome}</td>
                            <td>{curso.descricao}</td>
                            <td>
                                <button  onClick={() => handleEditClick(curso)} className="btn btn-primary btn-sm me-2">Editar</button>
                                <button onClick={() => excluirCurso(curso.id)} className="btn btn-danger btn-sm">Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <AddCursoComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} onSave={handleCursoRecebido} />


            <EditarCursoModal
                isOpen={isEditModallOpen}
                setIsOpen={setEditModalOpen}
                curso={cursoSelecionado}
                onSave={atualizarListaEditCurso}

            />

            <AlunosPorCursoModal
                isOpen={isViewModallOpen}
                setIsOpen={setViewModalOpen}
                cursoId={cursoSelecionado}
            />
        </div>
    );
}

export default CursoListComponent;