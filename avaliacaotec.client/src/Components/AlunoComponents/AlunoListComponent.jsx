import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlunoModal from './AddAlunoModal';
import EditarAlunoModal from './EditarModal';
import AddAlunoModal from './AddAlunoModal';
import AddMatriculaComponent from '../MatriculaComponents/AddMatriculaComponent';

function AlunosList() {
    const [alunos, setAlunos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isAddMatriculaOpen, setIsAddMatriculaOpen] = useState(false)
    const [alunoSelecionado, setAlunoSelecionado] = useState({ id: "", nome: ""});

    // Função para excluir aluno
    const excluirAluno = async (id) => {
        const url = `https://avaliacaotec-g9g3fpavb3f6hzhg.brazilsouth-01.azurewebsites.net/api/Aluno/DelAluno/${id}`;
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

        } catch (error) {
            console.error("Erro ao excluir aluno:", error);
            alert("Erro ao excluir o aluno.");
            }
        }
    };

    // Função para abrir o modal de edição com os dados do aluno selecionado
    const handleEditClick = (aluno) => {
        setAlunoSelecionado(aluno);
        setIsEditModalOpen(true);
    };
    const handleMatriculaClick = (alunoid, alunoNome) => {
        setAlunoSelecionado({ id: alunoid, nome: alunoNome });
        setIsAddMatriculaOpen(true);
    };

    const atualizarListaEditAlunos = (alunoAtualizado) => {
        setAlunos(alunos.map(aluno =>
            aluno.id === alunoAtualizado.id ? alunoAtualizado : aluno
        ));
    };

    const handleAlunoRecebido = async (novoAluno) => {
        try {

            setAlunos(prevAlunos => {
                const alunoExiste = prevAlunos.some(aluno => aluno.id === novoAluno.id);

                if (alunoExiste) {
                    console.warn("Aluno já existe e não será atualizado.");
                    return prevAlunos; 
                }
                return [...prevAlunos, novoAluno];
            });

        } catch (error) {
            console.error("Erro ao processar os dados do aluno:", error);
        }
    };


    useEffect(() => {
        fetch('https://avaliacaotec-g9g3fpavb3f6hzhg.brazilsouth-01.azurewebsites.net/api/Aluno/GetAlunos')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar os alunos');
                }
                return response.json();
            })
            .then((data) => {
                setAlunos(data);
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
                <h2 className="mb-4">Lista de Alunos</h2>
                <div className="p-6">
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="px-4 py-2 btn btn-success">
                        Adicionar Aluno
                    </button>

                    <AlunoModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}  />
                </div>
            </div>

            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Data de Nascimento</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {alunos.map(aluno => (
                        <tr key={aluno.id}>
                            <td>{aluno.id}</td>
                            <td>{aluno.nome}</td>
                            <td>{aluno.email}</td>
                            <td>{aluno.dataNascimento}</td>
                            <td>
                                <button onClick={() => handleMatriculaClick(aluno.id, aluno.nome)} className="btn btn-success btn-sm me-2">Matricular</button>
                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() => handleEditClick(aluno)}>
                                    Editar
                                </button>
                                <button onClick={() => excluirAluno(aluno.id)} className="btn btn-danger btn-sm">Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <EditarAlunoModal
                isOpen={isEditModalOpen}
                setIsOpen={setIsEditModalOpen}
                aluno={alunoSelecionado}
                onSave={atualizarListaEditAlunos}
                
            />

            <AddAlunoModal
                isOpen={isAddModalOpen}
                setIsOpen={setIsAddModalOpen}
                onSave={handleAlunoRecebido}            />

            <AddMatriculaComponent
                isOpen={isAddMatriculaOpen}
                setIsOpen={setIsAddMatriculaOpen}
                alunoId={alunoSelecionado?.id}
                alunoNome={alunoSelecionado?.nome}

            />
        </div>
    );
}

export default AlunosList;
