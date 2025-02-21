import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

export default function EditarAlunoModal({ isOpen, setIsOpen, aluno, onSave}) {
    const [formData, setFormData] = useState({
        id: "",
        nome: "",
        email: "",
        dataNascimento: ""
    });

    // Atualiza os dados do formulário quando o aluno muda
    useEffect(() => {
        if (aluno) {
            setFormData({
                id: aluno.id,
                nome: aluno.nome,
                email: aluno.email,
                dataNascimento: aluno.dataNascimento
            });
        }
    }, [aluno]);

    // Manipula a mudança nos campos do formulário
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Envia a edição para a API
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://avaliacaotec-g9g3fpavb3f6hzhg.brazilsouth-01.azurewebsites.net/api/Aluno/Atualizar/${formData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Erro ao editar aluno.");
            }

            const updateAluno = await response.json();

            onSave(updateAluno);
            alert("Aluno editado com sucesso");
            
            setIsOpen(false);

        } catch (error) {
            console.error("Erro ao editar aluno:", error);
            alert("Erro ao editar o aluno.");
        }
    };

    if (!isOpen) return null; 

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Editar Aluno</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input type="hidden" name="id" value={formData.id} />

                    <input
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Nome"
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        type="email"
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        name="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={handleChange}
                        type="date"
                        className="p-2 border rounded"
                    />

                    <div className="flex justify-end gap-2 mt-4">
                        <button type="button" onClick={() => setIsOpen(false)} className="btn btn-outline-secondary  px-4 py-2 bg-gray-300 rounded">
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-outline-success px-4 py-2 bg-blue-500 text-green rounded">
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

EditarAlunoModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    aluno: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nome: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        dataNascimento: PropTypes.string.isRequired
    }).isRequired,
    onSave: PropTypes.func.isRequired
};
