


function Sells() {

    const hideall = () => {
        document.querySelector('.products').classList.add("hidden")
        document.querySelector('.shopping').classList.add("hidden")
        document.querySelector('.categories').classList.add("hidden")
        document.querySelector('.sell').classList.add("hidden")
    }

    const show = (id) => {
        hideall()
        document.querySelector("." + id).classList.toggle("hidden")
    }


    return (
        <div className="sells hidden">
            <h1 className="tac">Vendas</h1>
        </div>
    )
}

export default Sells