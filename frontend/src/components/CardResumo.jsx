function CardResumo({ titulo, valor, cor, icon: Icon, detalhe }) {
  return (
    <article className="summary-card">
      <div className="summary-card-top">
        <div className="summary-icon" style={{ color: cor, backgroundColor: `${cor}18` }}>{Icon && <Icon />}</div>
        <span>{detalhe}</span>
      </div>
      <p>{titulo}</p>
      <strong>{Number(valor || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
    </article>
  );
}

export default CardResumo;
