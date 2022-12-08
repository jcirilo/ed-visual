import render from "../engine/render";
import { useState } from "react";
import { SequentialList } from "../structures/SequentialList";
import { Tabela } from "./Tabela";

type props = {
  lista : SequentialList<number>;
}

export function ControleMetodoListaSEQ ({lista}:props) {

    const [tamanho, setTamanho] = useState(lista.size());
    const [capacidade, setCapacidade] = useState(lista.getCapacity());
    const [busca, setBusca] = useState(0);
    const [lixo, setLixo] = useState(0);

    function handleInserir(e: any) {
      e.preventDefault();
      let valor = e.target.elements.inserirValor.value;
      let pos = e.target.elements.inserirPosicao.value;
      
      if (pos !== '' && valor !== '') {
        lista.insert(parseInt(pos), parseInt(valor));
        setTamanho(lista.size());
        render(lista.toArray(), 'LSEQ');
      }
      e.target.elements.inserirValor.value = '';
    }

    function handleRemover(e: any) {
      e.preventDefault();
      let pos = e.target.elements.removerPosicao.value;
      
      if (!lista.isEmpty() || pos !== '') {
        setLixo(lista.remove(parseInt(pos)));
        setTamanho(lista.size());
        render(lista.toArray(), 'LSEQ');
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
              <h1 className="mb-4 ml-2 font-semibold text-xl flex items-center">
                Métodos
              </h1>
              <form onSubmit={handleInserir}>
                <input type="submit" value="inserir" className="bg-white px-3 py-1 rounded-l-3xl mb-4 border-r-[1px] cursor-pointer hover:bg-gray-200"/>
                <input type="number" placeholder="valor" name="inserirValor" className="ml-0 text-center py-1 border-r-[1px] cursor-text mb-4 outline-none hover:bg-gray-200 w-14"/>
                <input type="number" placeholder="posção" name="inserirPosicao" min={1} max={tamanho+1} className="ml-0 text-center py-1 rounded-r-3xl cursor-text mb-4 outline-none hover:bg-gray-200 w-20"/>
              </form>
              <form onSubmit={handleRemover}>
                <input type="submit" value="remover" className="bg-white px-3 py-1 rounded-l-3xl mb-4 cursor-pointer border-r-[1px] hover:bg-gray-200"/>
                <input type="number" placeholder="posição" name="removerPosicao" min={1} max={tamanho} className="ml-0 text-center py-1 rounded-r-3xl cursor-text mb-4 outline-none hover:bg-gray-200 w-20"/>
              </form>
              <form onSubmit={handleBuscarElemento}>
                <input type="submit" value="elemento" className="bg-white px-3 py-1 rounded-l-3xl mb-4 cursor-pointer border-r-[1px] hover:bg-gray-200"/>
                <input type="number" placeholder="posição" name="elementoPosicao" min={1} max={tamanho+1} className="ml-0 text-center py-1 rounded-r-3xl cursor-text mb-4 outline-none hover:bg-gray-200 w-20"/>
              </form>
            </div>
            
            <div className="border-[1px] rounded-full mx-4"/>
            
            <div className="mr-8">
              <h1 className="mb-4 font-semibold text-xl">
                Informações
              </h1>
              <Tabela content={[
                {title: 'capacidade', content: capacidade},
                {title: 'tamanho', content: tamanho},
                {title: 'removido', content: lixo},
                {title: 'buscado', content: busca}
              ]}/>
            </div>
          </div>
    );
}