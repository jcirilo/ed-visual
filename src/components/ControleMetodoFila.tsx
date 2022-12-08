import { Queue } from "../structures/Queue";
import { useState } from "react";
import { Tabela } from "./Tabela";
import render from "../engine/render";

type props = {
  fila: Queue<number>;
};

export function ControleMetodoFila({ fila }: props) {
  const [tamanho, setTamanho] = useState(fila.size());
  const [inicio, setInicio] = useState(fila.isEmpty() ? "null" : fila.front());
  const [fim, setFim] = useState(fila.isEmpty() ? "null" : fila.back());

  function handlerInserir(e: any) {
    e.preventDefault();

    let val = e.target.elements.inputInserir.value;
    if ((val === "") === false) {
      fila.enqueue(val);
      setFim(fila.back());
      setInicio(fila.front());
      setTamanho(fila.size());
    }
    e.target.elements.inputInserir.value = "";
    render(fila.toArray(), 'FILA');
  }

  function handlerRemover() {
    if (!fila.isEmpty()) {
      fila.dequeue();
      setFim(fila.isEmpty() ? "null" : fila.back());
      setInicio(fila.isEmpty() ? "null" : fila.front());
      setTamanho(fila.size());
    }
    render(fila.toArray(), 'FILA');
  }

  return (
    <>
      <div className="bg-gray-100 m-4 rounded-md p-4 flex">
        <div className="w-full">
          <h1 className="mb-4 ml-2 font-semibold text-xl">Métodos</h1>
          <div>
            <form onSubmit={handlerInserir}>
              <input
                type="submit"
                value="inserir"
                className="bg-white px-4 py-1 rounded-l-3xl mb-4 cursor-pointer border-r-[1px] hover:bg-gray-200"
              />
              <input
                type="number"
                placeholder="valor"
                name="inputInserir"
                max={999}
                min={0}
                className="ml-0 text-center py-1 rounded-r-3xl cursor-text mb-4 outline-none hover:bg-gray-200 w-14"
              />
            </form>
          </div>
          <div>
            <input
              onClick={handlerRemover}
              type="button"
              value="remover"
              className="bg-white px-4 py-1 rounded-3xl mb-4 hover:bg-gray-200 cursor-pointer"
            />
          </div>
        </div>

        <div className="border-[1px] rounded-full mx-4" />

        <div className="w-full">
          <h1 className="mb-4 font-semibold text-xl">Informações</h1>
          <Tabela
            content={[
              { title: "tamanho", content: tamanho },
              { title: "inicio", content: !fila.isEmpty() ? inicio : "null" },
              { title: "final", content: !fila.isEmpty() ? fim : "null" },
            ]}
          />
        </div>
      </div>
    </>
  );
}
