import React, { useEffect, useState } from "react";
import "./style.css";
import useFetch from "../../hooks/useFetch";
import { GetBreakById, PostBreakFast, UpdateBreakFast } from "../../api/BreakFast";
import { useNavigate, useParams } from "react-router-dom";

const AddBreakFast = () => {
  const [nameColaborator, setNameColaborator] = useState("");
  const [cpf, setCpf] = useState("");
  const [optionBreakFast, setOptionBreakFast] = useState("");
  const [date, setDate] = useState(getTodayDate());
  const { loading, error, request } = useFetch();
  const [resultResponseApi, setResultResponseApi] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const [dataBreak, setBreak] = useState(null);

  useEffect(() => {
    async function getOneBreakById() {
      const { url, options } = GetBreakById(params.id);
      const { response, json } = await request(url, options);

      if (response && response.status === 200) {
        setBreak(json);
        setNameColaborator(json.nameColaborator);
        setCpf(json.cpf);
        setOptionBreakFast(json.optionBreakfast);
        setDate(json.data);
      }
    }
    getOneBreakById();
  }, [params.id, request]);

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

    const { url, options } = UpdateBreakFast(params.id, body);
    const { response } = await request(url, options);

    if (response.status === 201) {
      setResultResponseApi(true);
      navigate("/s")
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
      <h2>Formulário de Colaboradores (editar)</h2>
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
