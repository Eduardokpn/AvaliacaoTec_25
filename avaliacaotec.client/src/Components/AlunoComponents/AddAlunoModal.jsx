import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

export default function AddAlunoModal({ isOpen, setIsOpen, onSave}) {
    const [formData, setFormData] = useState({
        id: "",
        nome: "",
        email: "",
        dataNascimento: ""
    });

    // Manipula a mudança nos campos do formulário
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Envia a edição para a API
    const handleSubmit = async (e) => {
        e.preventDefault();
        

        try {
            delete formData.id;
            const response = await fetch(`https://avaliacaotec-g9g3fpavb3f6hzhg.brazilsouth-01.azurewebsites.net/api/Aluno/AdicionarAluno`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Erro ao Adicionar aluno.");
            }

            const alunoAdicionado = await response.json();
            onSave(alunoAdicionado);
            alert("Aluno adicionado com sucesso");

            setIsOpen(false);

        } catch (error) {
            console.error("Erro ao Adicionar aluno:", error);
            alert("Erro Adicionar o aluno.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-[5px]">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 ">
                <h2 className="text-xl font-bold mb-4">Adicionar Aluno</h2>

                <form onSubmit={handleSubmit} className="grid gap-3 justfiy-">
                    <input
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Nome"
                        className="p-2 g-cole-6 border rounded"
                        required
                    />
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        type="email"
                        className="p-2 g-cole-6 border rounded"
                        required
                    />
                    <input
                        name="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={handleChange}
                        type="date"
                        className="p-2 g-cole-6 border rounded"
                    />

                    <div className=" grid gap-2 mt-4">
                        <button type="button" onClick={() => setIsOpen(false)} className="btn btn-outline-secondary px-4 py-2 bg-gray-300 rounded">
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
AddAlunoModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};

