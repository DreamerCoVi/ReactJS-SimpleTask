import React, {useState} from 'react';

const TableSearch  = (props) => {

    const [value,setValue] = useState('')

    const valueChangeHandler = (e) => {
        setValue(e.currentTarget.value)
    }

    return ( 
        <div className='input-group mb-3 mt-3'>
            <div className='input-group-prepend'>
                <button className='btn btn-outline-secondary' 
                        type='button' onClick={() => props.onSearch(value)}>Search</button>
            </div>
            <input type='text'
                   className='form-control'
                   value={value}
                   onChange={valueChangeHandler}/>
        </div>
     );
}
 
export default TableSearch;