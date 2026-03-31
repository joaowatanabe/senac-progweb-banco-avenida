import { useForm } from "react-hook-form";
import { useState } from "react";

import "./App.css";

function App() {
  const { register, handleSubmit } = useForm();

  const [emprestimoAprovado, setEmprestimoAprovado] = useState("");
  const [emprestimoNegado, setEmprestimoNegado] = useState("");

  return (
    <>
      <div className="header__title">
        <img src="./handshake-img.png" alt="aperto de mãos - logo" />
        <div className="header__title-text">
          <h1>Banco Avenida</h1>
          <h2>App Controle de Emprestimos</h2>
        </div>
      </div>
      <div className="main__container">
        <form className="main__form" onSubmit={handleSubmit()}>
          <label htmlFor="nomeCliente">Nome do Cliente:</label>
          <input {...register("nomeCliente")} />
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
            <option value="menos5anos">Á menos de 5 anos</option>
            <option value="entre5e10">Entre 5 e 10 anos</option>
            <option value="acima10anos">Acima de 10 anos</option>
          </select>
          <label htmlFor="bens">Bens em seu nome:</label>
          <div className="bens__checkboxes">
            <label htmlFor="bens-CasaApto">Casa/Apto</label>
            <input
              {...register("bens")}
              type="radio"
              value="CasaApto"
              id="bens-CasaApto"
            />
            <label htmlFor="bens-Veiculo">Veículo</label>
            <input
              {...register("bens")}
              type="radio"
              value="Veiculo"
              id="bens-Veiculo"
            />
          </div>
          <button type="submit">Verificar Empréstimo</button>
          <button type="reset">Limpar Dados</button>
        </form>
      </div>
    </>
  );
}

export default App;
