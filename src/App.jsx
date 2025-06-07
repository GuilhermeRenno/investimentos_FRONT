
import { useState, useEffect } from 'react';
import axios from 'axios'

import './App.css'
import InvestmentList from './components/investmentList';
import InvestmentForm from './components/investmentForm';

const API_URL = 'http://localhost:3000/investimentos';



function App() {
  
  const [investments, setInvestments] = useState([])
  const[editingInvestment,setEditingInvestment] = useState(null);

  useEffect(() => {

    axios.get(API_URL)
      .then(response=> {

        setInvestments(response.data);

      })
      .catch(error => {
        console.error('Houve um erro ao buscar os investimentos:',error);
        
      });

  },[]);

  
  const handleDelete = (id)=> {

    if (window.confirm('Tem certeza que deseja excluir este investimento?')){
      axios.delete(`${API_URL}/${id}`)
        .then(() => {
        setInvestments(investments.filter(inv => inv.id !== id));
        })
        .catch(error =>{
          console.error('Houve um erro ao excluir o investimento:', error);
          alert('Não foi possível excluir o investimento.');
        });

    } 
  }

  const handleAdd = (investmentData) =>{

    axios.post(API_URL, investmentData)
      .then(response =>{
        setInvestments([...investments,response.data]);

    })
      .catch(error => {

        const errorMessage = error.response?.data?.message || 'Erro ao cadastrar investimento.';
        console.error('erro ao cadastrar',error);
        alert(errorMessage);

      });

  }

  const handleEdit =(investments) => {

    setEditingInvestment(investments);
  };

  const handleUpdate = (id, updateData) => {

    axios.put(`${API_URL}/${id}`, updateData)
      .then(response => {

        setInvestments(investments.map(inv =>(inv.id === id? response.data: inv)));
        setEditingInvestment(null);

      })
      .catch(error => {
        const errorMessage = error.response?.data?.message || 'Erro ao atualizar investimento.';
        console.error('Erro ao atualizar.',error);
        alert(errorMessage);

      });

  }
  
  const handleCancelEdit = () => {

    setEditingInvestment(null);

  };

  return (
    <div className="App">
      <h1>Controle de Investimentos</h1>
      
      <InvestmentForm
       onSubmit={handleAdd}
       onUpdate={handleUpdate}
       onCancel={handleCancelEdit}
       editingInvestment={editingInvestment}
      />
      <InvestmentList
       investments = {investments}
       onDelete={handleDelete}
       onEdit={handleEdit}
     />
    </div>

  );

  

} 
export default App
