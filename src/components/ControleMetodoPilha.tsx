import { Stack } from "../structures/Stack";
import { useState } from "react";
import { Tabela } from "./Tabela";
import render from "../engine/render";

type props = {
  pilha: Stack<number>;
}

export function ControleMetodoPilha ({pilha} : props) {

    const [tamanho, setTamanho] = useState(pilha.size());
    const [topo, setTopo] = useState(pilha.isEmpty() ? 'null' : pilha.peek());
    const [removido, setLixo] = useState(0);

    function handlerSubmit(e: any) {
      e.preventDefault();
      let valor = e.target.elements.empilhar.value;
      if (valor !== '') {
        pilha.push(parseInt(valor));
        setTopo(pilha.peek());
        setTamanho(pilha.size());
        render(pilha.toArray(), 'PILHA');
      }
      e.target.elements.empilhar.value = '';
    }

    function handleDesempilhar() {
      if (pilha.isEmpty() === false) {
        setLixo(pilha.pop());
        setTamanho(pilha.size());
        setTopo(pilha.isEmpty()? 'null' : pilha.peek());
        render(pilha.toArray(), 'PILHA');
      }
    }

    return (
        <div className="bg-gray-100 m-4 rounded-md p-4 flex">
            <div className="w-full">
                <h1 className="mb-4 ml-2 font-semibold text-xl">
                    Métodos
                </h1>
                <form onSubmit={handlerSubmit}>
                    <input type="submit" value="empilhar" className="bg-white px-4 py-1 rounded-l-3xl mb-4 cursor-pointer border-r-[1px] hover:bg-gray-200"/>
                    <input type="number" placeholder="valor" name="empilhar" className="ml-0 text-center py-1 rounded-r-3xl cursor-text mb-4 outline-none hover:bg-gray-200 w-14"/>
                </form>
                <div>
                    <input type="button" onClick={handleDesempilhar} value="desempilhar" className="bg-white px-4 py-1 rounded-3xl mb-4 hover:bg-gray-200 cursor-pointer"/>
                </div>
            </div>

            <div className="border-[1px] rounded-full mx-4"/>
            
            <div className="w-full">
              <h1 className="mb-4 font-semibold text-xl">
                Informações
              </h1>
              <Tabela content={[
                {title: 'tamanho'   ,   content: tamanho  },
                {title: 'topo'      ,   content: topo     },
                {title: 'removido'  ,   content: removido },
              ]}/>
            </div>
          </div>
    );
}