import { useEffect, useState } from 'react'


function Products() {
    const [items, setItems] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    let [updated, setUpdated] = useState(0)

    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const [type, setType] = useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/?api=set_product&name=' + name + '&value=' + value + '&type=' + type)
            .then(response => {
                if (response.ok) {
                    setName('')
                    setValue('')
                    setType('')
                    // setUpdated(updated++)
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

    const removeItem = (id) => {
        fetch('http://localhost:8080/?api=delete_product&id=' + id)
            .then(response => {
                if (response.ok) {
                    document.querySelector("#prod" + id).style.display = "none"
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
                setCategories(data)
                console.log(categories)
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
        <div className='tac products hidden'>
            <h1>Cadastrar produto</h1>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <input
                        value={name}
                        name="name"
                        placeholder="Nome"
                        required
                        onChange={(e) => setName(e.target.value)}
                    >

                    </input>
                    <input
                        value={value}
                        name="value"
                        type="number"
                        placeholder="Preço"
                        required
                        onChange={(e) => setValue(e.target.value)}
                    >

                    </input>
                    <select
                        value={name}
                        name="type"
                        required
                        onChange={(e) => setType(e.target.value)}
                    >
                        {categories.map(category => (
                            <option value={category.id}>{category.name}</option>
                        )
                        )}
                    </select>
                    <button >
                        Inserir
                    </button>
                </form>
            </div>

            <div className='items tac'>
                <h2>Produtos Cadastrados:</h2>
                {items.map(item => (
                    <div key={item.name} id={'prod' + item.id}>
                        <h3>{item.name}</h3>
                        <p>${Number(item.value).toFixed(2)}</p>
                        <p>Tipo: {(item.product_type)} ({item.tax_percent}%)</p>
                        <p><small>Taxa: ${Number((item.tax_percent / 100) * item.value).toFixed(2)}</small></p>
                        <button className='del' onClick={() => removeItem(item.id)}>Excluir</button>
                    </div>)
                )}
            </div>
        </div >

    )
}

export default Products