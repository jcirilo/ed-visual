import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { Tabela } from "./Tabela";
import render from "../engine/render";
import { BinaryTree } from "../structures/BinaryTree[incomplete]";

type props = {
  avb: BinaryTree<number>;
};

export function ControleMetodoAVB({ avb }: props) {
  const [tamanho, setTamanho] = useState(avb.size());
  const [preordem, setPreordem] = useState(avb.toPreorder());
  const [inordem, setInordem] = useState(avb.toPreorder());
  const [posordem, setPosordem] = useState(avb.toPreorder());

  function handlerPreordem(e:any) {}

  function handlerInordem(e:any) {}

  function handlerPosordem(e:any) {}

  function handlerInserirRaiz(e: any) {
    e.preventDefault();
    let raiz = e.target.elements.inserirRaiz.value;
    if (!(raiz === '')) {
      raiz = parseInt(raiz);
      avb.insertRoot(raiz);
      setTamanho(avb.size());
    }
  }

  function handlerInserirEsquerda(e : any) {
    e.preventDefault();
    let pai = e.target.elements.inserirEsquerdaPai.value;
    let filho = e.target.elements.inserirEsquerdaFilho.value;
    if (!(pai === '' || filho === '')) {
      pai = parseInt(pai);
      filho = parseInt(filho);
      avb.insertLeft(pai, filho);
      setTamanho(avb.size());
    }
  }

  function handlerInserirDireita(e:any) {
    e.preventDefault();
    let pai = e.target.elements.inserirDireitaPai.value;
    let filho = e.target.elements.inserirDireitaFilho.value;
    if (!(pai === '' || filho === '')) {
      pai = parseInt(pai);
      filho = parseInt(filho);
      avb.insertRight(pai, filho);
      setTamanho(avb.size());
    }
  }

  return (
    <>
      <div className="bg-gray-100 m-4 rounded-md p-4 flex">
        <div className="w-full">
          <h1 className="mb-4 ml-2 font-semibold text-xl">Métodos</h1>
          <form onSubmit={handlerInserirRaiz}>
                  <input type="submit" value="raiz" className="bg-white px-3 py-1 rounded-l-3xl mb-4 border-r-[1px] cursor-pointer hover:bg-gray-200"/>
                  <input type="number" placeholder="raiz" name="inserirRaiz" className="ml-0 text-center py-1 rounded-r-3xl cursor-text mb-4 outline-none hover:bg-gray-200 w-20"/>
          </form>
          <form onSubmit={handlerInserirEsquerda}>
                  <input type="submit" value="esq." className="bg-white px-3 py-1 rounded-l-3xl mb-4 border-r-[1px] cursor-pointer hover:bg-gray-200"/>
                  <input type="number" placeholder="filho" name="inserirEsquerdaFilho" className="ml-0 text-center py-1 border-r-[1px] cursor-text mb-4 outline-none hover:bg-gray-200 w-14"/>
                  <input type="number" placeholder="pai" name="inserirEsquerdaPai" className="ml-0 text-center py-1 rounded-r-3xl cursor-text mb-4 outline-none hover:bg-gray-200 w-20"/>
          </form>
          <form onSubmit={handlerInserirDireita}>
                  <input type="submit" value="dir." className="bg-white px-3 py-1 rounded-l-3xl mb-4 border-r-[1px] cursor-pointer hover:bg-gray-200"/>
                  <input type="number" placeholder="filho" name="inserirDireitaFilho" className="ml-0 text-center py-1 border-r-[1px] cursor-text mb-4 outline-none hover:bg-gray-200 w-14"/>
                  <input type="number" placeholder="pai" name="inserirDireitaPai" className="ml-0 text-center py-1 rounded-r-3xl cursor-text mb-4 outline-none hover:bg-gray-200 w-20"/>
          </form>
          <div>
            <input
              onClick={handlerInordem}
              type="button"
              value="in-ordem"
              className="bg-white px-4 py-1 rounded-3xl mb-4 hover:bg-gray-200 cursor-pointer disabled:bg-slate-200 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <input
              onClick={handlerPreordem}
              type="button"
              value="pre-ordem"
              className="bg-white px-4 py-1 rounded-3xl mb-4 hover:bg-gray-200 cursor-pointer disabled:bg-slate-200 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <input
              onClick={handlerPosordem}
              type="button"
              value="pos-ordem"
              className="bg-white px-4 py-1 rounded-3xl mb-4 hover:bg-gray-200 cursor-pointer disabled:bg-slate-200 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        <div className="border-[1px] rounded-full mx-4" />

        <div className="w-full">
          <h1 className="mb-4 font-semibold text-xl">Informações</h1>
          <Tabela
            content={[
              { title: "tamanho", content: tamanho },
              { title: "pré-ordem", content: preordem },
              { title: "pós-ordem", content: inordem },
              { title: "in-orndem", content: posordem },
            ]}
          />
        </div>
      </div>
    </>
  );
}
