import { LinkedList } from "../structures/LinkedList";
import { useState } from "react";
import { Tabela } from "./Tabela";
import render from "../engine/render";

type props = {
  lista : LinkedList<number>;
}

export function ControleMetodoListaSENC ({lista}:props) {

    const [tamanho, setTamanho] = useState(lista.size());
    const [cabeca, setCabeca] = useState(lista.isEmpty() ? 'null' : lista.getFirst());
    const [lixo, setLixo] = useState(0);
    const [busca, setBusca] = useState(0);

    function handleInserir(e: any) {
      e.preventDefault();
      let valor = e.target.elements.inserirValor.value;
      let pos = e.target.elements.inserirPosicao.value;
      if (valor !== '' && pos !== '') {
        lista.insert(parseInt(pos), parseInt(valor));
        setTamanho(lista.size());
        setCabeca(lista.getFirst());
        render(lista.toArray(), 'LSENC');
        e.target.elements.inserirValor.value = '';
      }
    }

    function handleRemover(e: any) {
      e.preventDefault();
      let pos = e.target.elements.removerPosicao.value;
      if (pos !== '') {
        setLixo(lista.remove(parseInt(pos)));
        setTamanho(lista.size());
        setCabeca(lista.isEmpty() ? 'null' : lista.getFirst());
        render(lista.toArray(), 'LSENC');
      }
    }

    function handleBuscarElemento(e: any) {
      e.preventDefault();
      let pos = e.target.elements.elementoPosicao.value;
      if (pos !== '') {
        setBusca(lista.element(parseInt(pos)));
      }
    }

    return (
        <div className="bg-gray-100 m-4 rounded-md p-4 flex">
            <div className="w-full">
              <h1 className="mb-4 ml-2 font-semibold text-xl">
                Métodos
              </h1>
                <form onSubmit={handleInserir}>
                  <input type="submit" value="inserir" className="bg-white px-3 py-1 rounded-l-3xl mb-4 border-r-[1px] cursor-pointer hover:bg-gray-200"/>
                  <input type="number" placeholder="valor" name="inserirValor" className="ml-0 text-center py-1 border-r-[1px] cursor-text mb-4 outline-none hover:bg-gray-200 w-14"/>
                  <input type="number" placeholder="posição" min={1} max={tamanho+1} name="inserirPosicao" className="ml-0 text-center py-1 rounded-r-3xl cursor-text mb-4 outline-none hover:bg-gray-200 w-20"/>
                </form>
                <form onSubmit={handleRemover}>
                  <input type="submit" value="remover" className="bg-white px-3 py-1 rounded-l-3xl mb-4 cursor-pointer border-r-[1px] hover:bg-gray-200"/>
                  <input type="number" placeholder="posição" min={1} max={tamanho} name="removerPosicao" className="ml-0 text-center py-1 rounded-r-3xl cursor-text mb-4 outline-none hover:bg-gray-200 w-20"/>
                </form>
                <form onSubmit={handleBuscarElemento}>
                  <input type="submit" value="elemento" className="bg-white px-3 py-1 rounded-l-3xl mb-4 cursor-pointer border-r-[1px] hover:bg-gray-200"/>
                  <input type="number" placeholder="posição" min={1} max={tamanho} name="elementoPosicao" className="ml-0 text-center py-1 rounded-r-3xl cursor-text mb-4 outline-none hover:bg-gray-200 w-20"/>
                </form>
            </div>
            
            <div className="border-[1px] rounded-full mx-4"/>
            
            <div className="mr-8">
              <h1 className="mb-4 font-semibold text-xl">
                Informações
              </h1>
              <Tabela content={[
                {title: 'tamanho', content: tamanho},
                {title: 'cabeça', content: cabeca},
                {title: 'removido', content: lixo},
                {title: 'buscado', content: busca},
              ]}/>
            </div>
          </div>
    );
}