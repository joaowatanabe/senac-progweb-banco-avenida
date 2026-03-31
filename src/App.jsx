import { useForm } from "react-hook-form";
import { useState } from "react";

import "./App.css";

function App() {
  const { register, handleSubmit, reset, setFocus } = useForm();

  const [resultado, setResultado] = useState(null);

  const formatarMoeda = (valor) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const limparDados = () => {
    reset({
      nomeCliente: "",
      dividaAtiva: "",
      clienteBanco: "",
      bens: [],
      salario: "",
    });
    setResultado(null);
    setTimeout(() => setFocus("nomeCliente"), 0);
  };

  const verificarEmprestimo = (dados) => {
    const salario = Number(String(dados.salario || "0").replace(",", "."));
    const bensSelecionados = Array.isArray(dados.bens)
      ? dados.bens
      : dados.bens
        ? [dados.bens]
        : [];

    const possuiCasaApto = bensSelecionados.includes("CasaApto");
    const possuiVeiculo = bensSelecionados.includes("Veiculo");

    const nomeCliente = dados.nomeCliente || "Cliente";

    if (
      dados.dividaAtiva === "sim" &&
      dados.clienteBanco === "menos5anos" &&
      bensSelecionados.length === 0
    ) {
      setResultado({
        tipo: "negado",
        mensagem: `Estimado(a) ${nomeCliente}: Empréstimo Não Autorizado.`,
        imagem: "/thumb-down.png",
      });
      return;
    }

    if (
      dados.dividaAtiva === "nao" &&
      dados.clienteBanco === "acima10anos" &&
      possuiCasaApto &&
      possuiVeiculo
    ) {
      const emprestimoAprovado = salario * 6;
      const totalComAcrescimo = emprestimoAprovado * 1.2;

      setResultado({
        tipo: "aprovado",
        mensagem: `Estimado(a) ${nomeCliente}: Empréstimo Pré-Aprovado de ${formatarMoeda(
          emprestimoAprovado,
        )}. Total com 20% de acréscimo: ${formatarMoeda(totalComAcrescimo)}.`,
        imagem: "/thumb-up.png",
      });
      return;
    }

    const emprestimoPossivel = salario * 3;
    setResultado({
      tipo: "gerente",
      mensagem: `Parabéns, ${nomeCliente}! Empréstimo Pré-aprovado de ${formatarMoeda(
        emprestimoPossivel,
      )}.`,
      imagem: "/thumb-up.png",
    });
  };

  return (
    <>
      <div className="header__title">
        <img src="/handshake-img.png" alt="aperto de mãos - logo" />
        <div className="header__title-text">
          <h1>Banco Avenida</h1>
          <h2>App Controle de Emprestimos</h2>
        </div>
      </div>
      <div className="main__container">
        <form
          className="main__form"
          onSubmit={handleSubmit(verificarEmprestimo)}
        >
          <label htmlFor="nomeCliente">Nome do Cliente:</label>
          <input id="nomeCliente" {...register("nomeCliente")} />

          <label htmlFor="salario">Salário:</label>
          <input
            id="salario"
            type="number"
            step="0.01"
            min="0"
            {...register("salario", { valueAsNumber: true })}
          />

          <div className="radio__btns">
            <label htmlFor="dividaAtiva">Possui divida ativa:</label>

            <label htmlFor="dividaAtiva-sim">Sim</label>
            <input
              {...register("dividaAtiva")}
              type="radio"
              value="sim"
              id="dividaAtiva-sim"
            />
            <label htmlFor="dividaAtiva-nao">Não</label>
            <input
              {...register("dividaAtiva")}
              type="radio"
              value="nao"
              id="dividaAtiva-nao"
            />
          </div>
          <label htmlFor="clienteBanco">Cliente do Banco:</label>
          <select {...register("clienteBanco")} id="clienteBanco">
            <option value="">Selecione</option>
            <option value="menos5anos">Á menos de 5 anos</option>
            <option value="entre5e10">Entre 5 e 10 anos</option>
            <option value="acima10anos">Acima de 10 anos</option>
          </select>
          <label htmlFor="bens">Bens em seu nome:</label>
          <div className="bens__checkboxes">
            <label htmlFor="bens-CasaApto">Casa/Apto</label>
            <input
              {...register("bens")}
              type="checkbox"
              value="CasaApto"
              id="bens-CasaApto"
            />
            <label htmlFor="bens-Veiculo">Veículo</label>
            <input
              {...register("bens")}
              type="checkbox"
              value="Veiculo"
              id="bens-Veiculo"
            />
          </div>

          <div className="main__actions">
            <button type="submit">Verificar Empréstimo</button>
            <button type="button" onClick={limparDados}>
              Limpar Dados
            </button>
          </div>
        </form>

        {resultado && (
          <section className={`resultado resultado--${resultado.tipo}`}>
            <img
              src={resultado.imagem}
              alt="Status da avaliação de empréstimo"
            />
            <p>{resultado.mensagem}</p>
          </section>
        )}
      </div>
    </>
  );
}

export default App;
