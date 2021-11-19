
import React, { useState, useEffect } from 'react';
import Data from '../Assets/Data/Data.json';

//Components
import Builder from '../Components/Builder/Builder.js'
import QueryBox from '../Components/QueryBox/QueryBox';
import GetFields from '../webServices/introspection/fields';

const des = Data.ht_data.builder_page

export default function HtBuilder() {
  const [_fields, set_fields] = useState()
  const [_state, set_state] = useState()


  useEffect(() => {
    const COVER = document.getElementById("title-cover-ht")
    if (COVER) {
      const COVER_REACTION = new CustomEvent('coverR', {
        bubbles: true,
        detail: {
          state: _state,
        }
      });
      COVER.dispatchEvent(COVER_REACTION);
    }
    //console.log(_fields)
  }, [_state,_fields])

  return (
    <article>
      {
        !_fields
        ?<GetFields field_type_name="Dataset" status={(state)=>{set_state(state)}} resoultsData={(data)=>{set_fields(data)}} />
        :null
      }
      <h2 dangerouslySetInnerHTML={{__html: des.title}} />
      <p style={{ marginLeft: "5%" }} dangerouslySetInnerHTML={{__html: des.description}} />
      <QueryBox />
      <Builder />
    </article>
  );
}