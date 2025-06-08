
import './investmentList.css';

const formatDate = (date) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(date).toLocaleDateString('pt-BR', options);
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

function InvestmentList({investments, onDelete, onEdit}) {
    return(

        <div className="investment-list">
            <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Tipo</th>
                        <th>Valor Investido</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                   {investments.map((inv) => (
                        <tr key={inv.id}>
                        <td data-label="Nome">{inv.nome}</td>
                        <td data-label="Tipo">{inv.tipo}</td>
                        <td data-label="Valor Investido">{formatCurrency(inv.valor)}</td>
                        <td data-label="Data">{formatDate(inv.data)}</td>
                        <td data-label="Ações">
                            <button className="edit-btn" onClick={() => onEdit(inv)}>Editar</button>
                            <button className="delete-btn" onClick={() => onDelete(inv.id)}>Excluir</button>
                        </td>
                        </tr>
                     ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default InvestmentList;