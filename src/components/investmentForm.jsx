import { useState, useEffect, } from "react";
import './investmentForm.css'; 

function InvestmentForm({onSubmit, onUpdate,onCancel, editingInvestment}) {

    const[nome, setNome] = useState('');
    const[tipo, setTipo] = useState('');
    const[valor, setValor] = useState('');
    const[data, setData] = useState('');

    const isEditing = editingInvestment!==null;

    useEffect(() => {
        if (isEditing){
            setNome(editingInvestment.nome);
            setTipo(editingInvestment.tipo);
            setValor(editingInvestment.valor.toString());
            setData(editingInvestment.data.split('T')[0]);
        } else {

        setNome('');
        setTipo('');
        setValor('');
        setData('');     
        }
    },  [editingInvestment, isEditing]);

    const handleSubmit = (event)=> {

        event.preventDefault()
        const investmentData = { nome, tipo, valor: parseFloat(valor), data };

        if (isEditing) {
            onUpdate(editingInvestment.id, investmentData);
        } else {
            onSubmit(investmentData);
        }

        setNome('');
        setTipo('');
        setValor('');
        setData('');
  };

return (
    <form onSubmit={handleSubmit} className="investment-form">

        <h2>{isEditing ? 'Editar Investimento' : 'Cadastrar Investimento'}</h2>
        <input type="text" placeholder="Nome" value={nome} onChange={(e)=> setNome(e.target.value)}required />
        <input type="text" placeholder="Tipo" value={tipo} onChange={(e)=> setTipo(e.target.value)}required />
        <input type="number" placeholder="Valor Investido" value={valor} onChange={(e)=> setValor(e.target.value)}required />
        <input type="date" value={data} onChange={(e)=> setData(e.target.value)}required />
        <button type="submit">{isEditing?'Salvar Alterações': 'Cadastrar'}</button>
        {isEditing && <button type="button" onClick={onCancel} className="cancel-btn">Cancelar</button>}
    </form>
    );
}

export default InvestmentForm;