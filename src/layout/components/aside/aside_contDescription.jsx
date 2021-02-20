import React, { useState, useEffect } from 'react';

const ContDescription = () => {

    const [_text, set_text] = useState('');

    useEffect(() => {
        document.addEventListener('mousemove',e =>{
            const component = e.target.getAttribute('assistentValue')
            if(component){
                set_text(component)
            }else{
                set_text('')
            }
        })
    }, []);

    return ( 
        <div >
            {_text}
        </div>
     );
}
 
export default ContDescription;