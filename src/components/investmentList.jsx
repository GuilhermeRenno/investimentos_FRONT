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
                            <td>{inv.nome}</td>
                            <td>{inv.tipo}</td>
                            <td>{formatCurrency(inv.valor)}</td>
                            <td>{formatDate(inv.data)}</td>
                            <td>
                                <button className="edit-btn" onClick={() => onEdit(inv)}>Editar</button>
                                <button className="delete-btn" onClick={()=> onDelete(inv.id)}>Excluir</button>
                            </td>
                        </tr>
                     ))}
                </tbody>
            </table>
        </div>
    );
}

export default InvestmentList;