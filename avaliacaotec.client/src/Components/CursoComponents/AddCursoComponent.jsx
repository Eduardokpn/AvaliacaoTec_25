import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

export default function AddCursoComponent({ isOpen, setIsOpen, onSave }) {
    const [formData, setFormData] = useState({
        nome: "",
        descricao: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://avaliacaotec-g9g3fpavb3f6hzhg.brazilsouth-01.azurewebsites.net/api/Curso/AdicionarCurso`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Erro ao Adicionar curso.");
            }

            const cursoAdicionado = await response.json();
            onSave(cursoAdicionado)
            alert("Curso adicionado com sucesso");
            setIsOpen(false);

        } catch (error) {
            console.error("Erro ao Adicionar curso:", error);
            alert("Não foi possível Adicionar o curso.");
        }
    };
    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Adicionar Curso</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Nome"
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        placeholder="Descricao"
                        className="p-2 border rounded"
                        required
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
AddCursoComponent.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};