import { useEffect, useState } from 'react'

function Categories() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [name, setName] = useState("");
    const [taxPercent, setTaxPercent] = useState("");


    let handleSubmit = async (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/?api=set_product_type&name=' + name + '&tax=' + taxPercent)
            .then(response => {
                if (response.ok) {
                    setName('')
                    setTaxPercent('')
                    return response.json()

                }
                throw response;
            })
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error("Error fetching data: ", error)
                setError(error)
            })
    }

    const removeItem = (id) => {
        fetch('http://localhost:8080/?api=delete_product_type&id=' + id)
            .then(response => {
                if (response.ok) {
                    document.querySelector("#cat" + id).style.display = "none"
                    return response.json()
                }
                throw response;
            })
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error("Error fetching data: ", error)
                setError(error)
            })
    }

    useEffect(() => {
        fetch('http://localhost:8080/?api=get_product_types')
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
            <h1>Cadastrar Categoria</h1>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <input
                        value={name}
                        name="name"
                        placeholder="Nome"
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        value={taxPercent}
                        type='number'
                        name="taxPercent"
                        placeholder="0.00"
                        required
                        onChange={(e) => setTaxPercent(e.target.value)}
                    />
                    <button>
                        Inserir
                    </button>
                </form>
            </div>

            <div className='items tac'>

                <h2>Categorias existentes:</h2>
                {items.map(item => (
                    <div key={item.id} id={"cat" + item.id}>
                        <p>
                            <b>{item.name}</b> - {Number(item.tax_percent).toFixed(2)}%
                            <button className='del' onClick={() => removeItem(item.id)}>
                                Excluir
                            </button>
                        </p>

                    </div>)
                )}
            </div>
        </div >
    )
}

export default Categories   