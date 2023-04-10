import { useEffect, useState } from 'react'


function ShoppingCart() {
    const [items, setItems] = useState([])
    const [cart, setCart] = useState([])
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

    const addToCart = (item) => {
        const cartCopy = [...cart]
        const itemInCart = cartCopy.find(i => item.name === i.name)
        if (itemInCart) {
            itemInCart.quantity += 1
            setCart(cartCopy)
        } else {
            setCart(prevCart => [...prevCart, { ...item, quantity: 1 }])
        }
    }
    const makeSell = () => {
        console.log(cart)
        let total = 0;
        let taxes = 0;
        for (let i in cart) {
            total += Number(Number(cart[i].value * cart[i].quantity) + (Number(cart[i].value) * cart[i].tax_percent / 100));
            taxes += Number((Number(cart[i].value * cart[i].quantity) * cart[i].tax_percent / 100))
        }
        console.log(total)
        console.log(taxes)
        console.log(JSON.stringify(cart))
        saveSell(total, taxes, JSON.stringify(cart))
    }
    const saveSell = async (total, taxes, items) => {
        fetch('http://localhost:8080/?api=set_sell&value=' + total + '&taxes=' + taxes + '&items=' + items)
            .then(response => {
                if (response.ok) {
                    setCart([])
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
    const increase = name => {
        const cartCopy = [...cart]
        const item = cartCopy.find(i => i.name === name)
        item.quantity += 1
        setCart(cartCopy)
    }
    const decrease = name => {
        let cartCopy = [...cart]
        const item = cartCopy.find(i => i.name === name)
        if (item.quantity > 1) {
            item.quantity -= 1
        } else {
            cartCopy = cartCopy.filter(i => i.name !== name)
        }
        setCart(cartCopy)
    }
    return (
        <div className='shopping'>
            <h1>Carrinho de compras</h1>
            <div className='cart '>
                <div className='items'>
                    <h2>Produtos</h2>
                    {items.map(item => (
                        <div key={item.name}>
                            <h3>{item.name}</h3>
                            <p>${Number(item.value).toFixed(2)}</p>
                            <p><small>Taxa: ${Number((item.tax_percent / 100) * item.value).toFixed(2)}</small></p>
                            <button onClick={() => addToCart(item)}>Adicionar</button>
                        </div>)
                    )}
                </div>
                <div>
                    <h2>Carrinho</h2>
                    {cart.map(item => (
                        <div key={item.name}>
                            <h3>{item.name}</h3>
                            <p>
                                <button onClick={() => decrease(item.name)}>-</button>
                                {item.quantity}
                                <button onClick={() => increase(item.name)}>+</button>
                            </p>
                            <p>Subtotal: ${Number((item.quantity * item.value) + (item.quantity * item.value) * (item.tax_percent / 100)).toFixed(2)}</p>
                            <p></p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='total'>
                <h2>Total: ${Number(cart.reduce((acc, i) => acc + (i.quantity * Number(i.value) + (i.quantity * Number(i.value) * (i.tax_percent / 100))), 0)).toFixed(2)}</h2>
                {/*                 <h2>Total taxas: ${Number(taxes.reduce((acc, i) => acc + (i.quantity * Number(i.value) * (i.tax_percent / 100))), 0).toFixed(2)}</h2> */}
            </div>
            <div className='tac'>
                <button onClick={() => makeSell()}>Vender</button>
            </div>
        </div >
    )
}

export default ShoppingCart
