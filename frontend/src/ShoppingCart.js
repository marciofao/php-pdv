import { useEffect, useState } from 'react'

/* const items = [
    {
        "id": 1,
        "name": "cadeira",
        "value": "20",
        "product_type_id": 1,
        "product_type": "regular",
        "tax_percent": "10"
    },
    {
        "id": 2,
        "name": "test",
        "value": "2",
        "product_type_id": 1,
        "product_type": "regular",
        "tax_percent": "10"
    },
    {
        "id": 68,
        "name": "test2",
        "value": "30.5",
        "product_type_id": null,
        "product_type": null,
        "tax_percent": null
    }
] */


/* async function fetch_data() {

    fetch('http://localhost:8080/?api=get_products', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(response => {
            return response.json()
        })
        .then(response => console.log(JSON.stringify(response)))
    // .then(response => console.log(response.stringfy))


}
fetch_data();
//const items = fetch_data();
const items = []; */



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

    if (loading) return "Loading..."
    if (error) return "Error!"

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
        <div>
            <h1>Shopping Cart</h1>
            <div className='cart'>
                <div className='items'>
                    <h2>Items</h2>
                    {items.map(item => (
                        <div key={item.name}>
                            <h3>{item.name}</h3>
                            <p>${item.value}</p>
                            <button onClick={() => addToCart(item)}>Add to Cart</button>
                        </div>)
                    )}
                </div>
                <div>
                    <h2>Cart</h2>
                    {cart.map(item => (
                        <div key={item.name}>
                            <h3>{item.name}</h3>
                            <p>
                                <button onClick={() => decrease(item.name)}>-</button>
                                {item.quantity}
                                <button onClick={() => increase(item.name)}>+</button>
                            </p>
                            <p>Subtotal: ${Number(item.quantity * item.value).toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='total'>
                <h2>Total: ${Number(cart.reduce((acc, i) => acc + (i.quantity * Number(i.value)), 0)).toFixed(2)}</h2>
            </div>
        </div >
    )
}

export default ShoppingCart
