
import { useEffect, useState } from 'react'


function Sells() {

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('http://localhost:8080/?api=get_sells')
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
        <div className="sells hidden">
            <h1 className="tac">Vendas</h1>

            <div className='items tac'>

                <h2>Categorias existentes:</h2>
                {items.map(item => (
                    <div key={item.id} id={"sell" + item.id}>
                        <p>
                            <b>${Number(item.value).toFixed(2)}</b> - Taxas: ${Number(item.taxes).toFixed(2)}

                        </p>
                        <p>
                            Detalhes: <br></br>
                            {item.items}
                        </p>
                        <p>
                            Data: <br></br>
                            {item.created_at}
                        </p>

                    </div>)
                )}
            </div>
        </div >
    )
}

export default Sells