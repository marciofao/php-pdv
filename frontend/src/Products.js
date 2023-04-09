import { useEffect, useState } from 'react'


function Products() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('http://localhost:8080/?api=get_products')
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response;
            })
            .then(data => {
                setItems(data)
                console.log(items)
            })
            .catch(error => {
                console.error("Error fetching data: ", error)
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) return "Carregando..."
    if (error) return "Erro!"

    return (
        <div className='tac'>
            <h1>Produtos Cadastrados</h1>
            <div className="form">
                <input name="Nome" placeholder="Nome" required>

                </input>
                <input name="value" placeholder="0.00" required>

                </input>
                <select required>
                    <option>teste</option>
                </select>
                <button>
                    Inserir
                </button>
            </div>

            <div className='items tac'>
                <h2>Produtos</h2>
                {items.map(item => (
                    <div key={item.name}>
                        <h3>{item.name}</h3>
                        <p>${Number(item.value).toFixed(2)}</p>
                        <p>Tipo: {(item.product_type)}</p>
                        <p><small>Taxa: ${Number((item.tax_percent / 100) * item.value).toFixed(2)}</small></p>
                        <button className='del' onClick={() => { }}>Excluir</button>
                    </div>)
                )}
            </div>
        </div >

    )
}

export default Products