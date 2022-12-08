interface Content {
    title: string,
    content: any
}

interface Props {
    content : Array<Content>;
}

export function Tabela ({content} : Props) {
    const td_element_class = 'border-[1px] border-gray-300 py-1 px-2';
    return (
        <table>
            <tbody>
                {content.map(e => 
                    <tr key={Math.random()*1000}>
                        <td className={td_element_class}>{e.title}</td>
                        <td className={td_element_class}>{e.content}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}
