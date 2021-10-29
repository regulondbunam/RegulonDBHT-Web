import React, { useState } from 'react';
import Autocomplete from './autocomplete';
import './Builder.css'

export default function Builder() {
    const [_keyword, set_keyword] = useState()

    return (
        <div>
            <div>
                <h3 >Builder</h3>
                <button >All Fields</button>
                <input id="builder_text" type="text" className="TextArea" onChange={() =>{
                    let keyword = document.getElementById("builder_text").value
                    set_keyword(keyword)
                }} />
                <button className="iconButton" ><i className='bx bx-plus-circle'></i></button>
                <button >AND</button>
            </div>
            <div className="IndexList">
                <p>Show Index</p>
            </div>
            <div className="SearchButton">
                <button className="accent">Search</button>
            </div>
            <Autocomplete keyword={_keyword} location={"publication.authors"} />
        </div>
    );
}
