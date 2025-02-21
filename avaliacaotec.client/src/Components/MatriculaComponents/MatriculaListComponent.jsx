import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function MatriculaListComponent() {
    const [matriculas, setMatricula] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://avaliacaotec-g9g3fpavb3f6hzhg.brazilsouth-01.azurewebsites.net/api/Aluno/matriculados')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar os Matriculas');
                }
                return response.json();
            })
            .then((data) => {
                setMatricula(data);
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
        <div className="container" style={{padding: '20px' }}>
            <h2 className="mb-4">Lista de Alunos Matriculados</h2>

            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {matriculas.map(matricula => (
                        <tr key={matricula.id}>
                            <td>{matricula.id}</td>
                            <td>{matricula.nome}</td>
                            <td>{matricula.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MatriculaListComponent;