function CardResumo({ titulo, valor, cor }) {

    return (

        <div
            className="card"
            style={{
                borderTop: `6px solid ${cor}`
            }}
        >

            <h3>{titulo}</h3>

            <p className="valor-card">
                {Number(valor).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            </p>

        </div>

    );

}

export default CardResumo;