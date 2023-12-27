import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
import {
  DeleteBreak,
  GetAllBreakByData,
  GetBreakById,
} from "../../api/BreakFast";
import useFetch from "../../hooks/useFetch";

const ListBreak = () => {
  const { request } = useFetch();
  const [dataList, setDataList] = useState([]);
  const [selectedDate, setSelectedDate] = useState("2023-12-28");
  const [searchId, setSearchId] = useState("");
  const [reload, setReload] = useState(0);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    async function getAllBreakByDate() {
      const { url, options } = GetAllBreakByData(selectedDate);
      const { response, json } = await request(url, options);

      if (response.status === 200) {
        setDataList(json);
      }
    }

    getAllBreakByDate();
  }, [request, selectedDate, reload]);

  const searchById = async () => {
    const { url, options } = GetBreakById(Number(searchId));
    const { response, json } = await request(url, options);

    if (response.status === 200) {
      setDataList(Array(json));
    } else {
      setDataList(0);
    }
  };

  const handleDelete = async (id) => {
    const { url, options } = DeleteBreak(id);
    const { response } = await request(url, options);

    if (response.status === 204) {
      setReload((number) => number + 1);

      setSuccessMessage(true);

      setTimeout(() => {
        setSuccessMessage(false);
        setTimeout(() => {
          window.location.href = "/"; // Redirecionar para a rota '/'
        }, 1000);
      }, 2000);
    }
  };

  return (
    <main>
      {successMessage && (
        <div className="success">
          <span>Café deletado com sucesso</span>
        </div>
      )}

      <div style={{ margin: "40px" }}>
        <h2>Tabela de Colaboradores</h2>

        <div className="search">
          <div className="byDate">
            <label htmlFor="datePicker">Selecionar Data:</label>
            <input
              type="date"
              id="datePicker"
              name="datePicker"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="byId">
            <label htmlFor="searchId">Pesquisar por ID:</label>
            <input
              type="text"
              id="searchId"
              name="searchId"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button type="button" onClick={searchById}>
              Pesquisar
            </button>
          </div>
        </div>

        {dataList && dataList.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Colaborador</th>
                <th>Opção café</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.nameColaborator}</td>
                  <td>{data.optionBreakfast}</td>
                  <td>{data.data}</td>
                  <td className="action-buttons">
                    <NavLink to={`/edit/${data.id}`}>
                      <button className="edit-button">Editar</button>
                    </NavLink>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(data.id)}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h3 className="noBreak">
            Nesse dia não tem ninguém para levar o café da manhã
          </h3>
        )}
      </div>
    </main>
  );
};

export default ListBreak;
