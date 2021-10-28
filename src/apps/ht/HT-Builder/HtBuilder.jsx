
import React, { useState, useEffect } from 'react';
import Data from '../Assets/Data/Data.json';

//Components
import Builder from '../Components/Builder/Builder.js'
import QueryBox from '../Components/QueryBox/QueryBox';

const des = Data.ht_data.builder_page

export default function HtBuilder() {
  const [_data, set_data] = useState()
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
  }, [_state])

  return (
    <article>
      <h2 dangerouslySetInnerHTML={{__html: des.title}} />
      <p style={{ marginLeft: "5%" }} dangerouslySetInnerHTML={{__html: des.description}} />
      <QueryBox />
      <Builder />
    </article>
  );
}