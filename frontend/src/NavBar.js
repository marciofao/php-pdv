


function Navbar() {

    const hideall = () => {
        document.querySelector('.products').classList.add("hidden")
        document.querySelector('.shopping').classList.add("hidden")
        document.querySelector('.categories').classList.add("hidden")
    }

    const show = (id) => {
        hideall()
        document.querySelector("." + id).classList.toggle("hidden")
    }


    return (
        <nav>
            <button onClick={() => show("shopping")} >
                Carrinho de compras
            </button>
            <button onClick={() => show("products")}>
                Produtos
            </button>
            <button onClick={() => show("categories")}>
                Categorias
            </button>

        </nav >
    )
}

export default Navbar