import React from 'react'

const ModeSelector = (props) => {
    const smallUrl = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
    const largeUrl = 'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
    return ( 
        <div>
            <p>Размер пакета: </p>
            <button onClick={() => props.onSelect(smallUrl)} className="btn btn-success">32</button>
            <button onClick={() => props.onSelect(largeUrl)} className="btn btn-danger">1000</button>
        </div>
     );
}
 
export default ModeSelector;