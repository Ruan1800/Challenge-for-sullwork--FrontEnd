import React, { useState } from "react";
import "./style.css";
import useFetch from "../../hooks/useFetch";
import { PostBreakFast } from "../../api/BreakFast";

const AddBreakFast = () => {
  const [nameColaborator, setNameColaborator] = useState("");
  const [cpf, setCpf] = useState("");
  const [optionBreakFast, setOptionBreakFast] = useState("");
  const [date, setDate] = useState(getTodayDate());
  const { loading, error, request } = useFetch();
  const [resultResponseApi, setResultResponseApi] = useState();

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  }

  const submitBreakFast = async (event) => {
    event.preventDefault();

    const body = {
      nameColaborator,
      cpf,
      optionBreakfast: optionBreakFast,
      data: date,
    };

    console.log(body)

    const { url, options } = PostBreakFast(body);
    const { response } = await request(url, options);

    if (response.status === 201) {
      setResultResponseApi(true);
    } else {
      setResultResponseApi(false);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const todayDate = getTodayDate();
  
    if (selectedDate < todayDate) {
      setDate(todayDate);
    } else {
      setDate(selectedDate);
    }
  };

  const handleCpfChange = (e) => {
    const cleanedCpf = e.target.value.replace(/\D/g, "");
    setCpf(cleanedCpf);
  };

  return (
    <main>
      <h2>Formulário de Colaboradores</h2>
      <form onSubmit={submitBreakFast}>
        <label htmlFor="nameColaborator">Nome do Colaborador:</label>
        <input
          type="text"
          id="nameColaborator"
          name="nameColaborator"
          value={nameColaborator}
          onChange={(e) => setNameColaborator(e.target.value)}
          required
        />

        <label htmlFor="cpf">CPF:</label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          value={cpf}
          onChange={handleCpfChange}
          required
        />

        <label htmlFor="optionBreak">Opção café:</label>
        <input
          type="text"
          id="optionBreak"
          name="optionBreak"
          value={optionBreakFast}
          onChange={(e) => setOptionBreakFast(e.target.value)}
          required
        />

        <label htmlFor="data">Data:</label>
        <input
          type="date"
          id="data"
          name="data"
          value={date}
          onChange={handleDateChange}
          required
        />

        <button type="submit">Enviar</button>
      </form>

      {resultResponseApi && (
        <div className="response">
          <span>Café da manhã da manhã foi cadastrado</span>
        </div>
      )}
    </main>
  );
};

export default AddBreakFast;
