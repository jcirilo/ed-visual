import { useEffect, useState } from "react"
import { ControleMetodoFila } from "./components/ControleMetodoFila";
import { ControleMetodoListaSENC } from "./components/ControleMetodoListaSENC";
import { ControleMetodoListaSEQ } from "./components/ControleMetodoListaSEQ";
import { ControleMetodoPilha } from "./components/ControleMetodoPilha";
import { ControleMetodoAVB } from "./components/ControleMetodoAVB";
import { LinkedList } from "./structures/LinkedList";
import { Queue } from "./structures/Queue";
import { SequentialList } from "./structures/SequentialList";
import { Stack } from "./structures/Stack";
import render from "./engine/render";
import { BinaryTree } from "./structures/BinaryTree[incomplete]";

function App() {
  
  const [lseq] = useState(new SequentialList<number>(12));
  const [lsenc] = useState(new LinkedList<number>());
  const [pilha] = useState(new Stack<number>());
  const [fila] = useState(new Queue<number>());
  const [avb, setAvb] = useState(new BinaryTree<number>());
  const [controle, setControle] = useState(<></>);

  function handlerRenderizarControle(e:any): void {
    let tipo = e.target.value;
    let componente = <></>;
    switch (tipo) {
      case 'FILA':
        componente = <ControleMetodoFila fila={fila}/>;
        render(fila.toArray(), 'FILA');
        break;
      case 'LSEQ':
        componente = <ControleMetodoListaSEQ lista={lseq} />;
        render(lseq.toArray(), 'LSEQ');
        break;
      case 'LSENC':
        componente = <ControleMetodoListaSENC lista={lsenc} />;
        render(lsenc.toArray(), 'LSENC');
        break;
      case 'PILHA':
        componente = <ControleMetodoPilha pilha={pilha} />;
        render(pilha.toArray(), 'PILHA');
        break;
      case 'AVB':
        // componente = <div className='pl-8 py-2 bg-yellow-100 flex w-full'>AVL indisponivel!</div>;
        componente = <ControleMetodoAVB avb={avb}/>
        render([], '');
        break;
    }
    setControle(componente);
  }

  useEffect(() => render([], ''), [])

  return (
    <div className="bg-gray-100 w-full flex">
      <div className="bg-white w-full h-auto pb-2 md:min-h-screen md:pb-0 border-r-2 md:w-[480px] ">
        <div className="p-4">
          <div className="flex justify-around items-center">
            <h1 className="text-2xl font-semibold">
              E. D. Visual
            </h1>
            <div className="p-4 rounded-lg bg-gray-100">
              <label htmlFor="seletor-estruturas" className="text-gray-600 font-semibold">
                Estrutura
              </label>
              <select onChange={handlerRenderizarControle} name="seletor-estruturas" id="seletor-estruturas" className="cursor-pointer outline-none px-2 py-1 rounded-lg text-gray-600 ml-4 hover:bg-gray-200" >
                <option value='-'>
                    -
                </option>
                <option value='PILHA'>
                    PILHA
                </option>
                <option value='FILA'>
                    FILA
                </option>
                <option value='LSEQ'>
                    L. SEQUENCIAL
                </option>
                <option value='LSENC'>
                    L. ENCADEADA
                </option>
                <option value='AVB' disabled className="disabled:cursor-not-allowed">
                    AVL -indisponível- 
                </option>
              </select>
            </div>
          </div>
        </div>
        <div>
          {controle}
        </div>
      </div>
      <canvas id="render">
      </canvas>
    </div>
  )
}

export default App
