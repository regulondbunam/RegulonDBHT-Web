import React, { useState, useEffect } from "react";
import './Autocomplete02.css'

const Autocompletev02 = ({ suggestions, id }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");

  console.log(input);

  useEffect(() => {
    const inputText = document.getElementById(id)
    if (inputText) {
        inputText.addEventListener('inputTextR', function (e) {
            console.log( e.detail)
            if (e.detail.inputText || e.detail.inputText === '') {
                setInput(e.detail.inputText)
            }
        }, false);
    }
}, [setInput, id])

  const onChange = (e) => {
    const userInput = e.target.value;

    // Filter our suggestions that don't contain the user's input
    const unLinked = Array.isArray(suggestions) ? suggestions.filter(
      (suggestion) => {
        if (typeof (suggestion) === 'string' || typeof (suggestion) === 'number') {
          suggestion = "" + suggestion
          return suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        }
        return null
      }
    ) : [];
    setInput(e.target.value);
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };

  const onClick = (e) => {
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            className = "suggestion-active";
          }
          return (
            <li className={className} key={suggestion} onClick={onClick}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
      <></>
    );
  };

  return (
    <div className="autocompleteBlock">
      <input
        className="auto_input"
        autoComplete="off"
        type="text"
        id={id}
        onChange={onChange}
        //onKeyDown={onKeyDown}
        value={input}
        disabled={false}
      />
      {showSuggestions && input && <SuggestionsListComponent />}
      {
        suggestions && <div>
          <button className='aBase'
            onClick={(e)=>{
              let mybutton = e.target
              let sugs = document.getElementById("suggest_autocomplete")
              if(sugs){
                if (sugs.style.display === "none") {
                  sugs.style.display = "block"
                  mybutton.innerHTML = `hide index...`
                } else {
                  sugs.style.display = "none"
                  mybutton.innerHTML = `view index...`
                }
                
              }
            }}
          > view index...</button> 
          <div id="suggest_autocomplete" style={{ height: "200px", overflow: "auto", display: "none" }} >
            <table>
              <tbody>
                {
                  suggestions.map((sug, i) => {

                    return <tr key={`${sug}_${i}`} className="autocomleteSelection"
                    onClick={()=>{
                      setInput(sug)
                    }}
                    >
                      <td>
                        {sug}
                      </td>
                    </tr>
                  })
                }
              </tbody>
            </table>
           
          </div>
          <p>({suggestions.length}) suggest</p>
        </div>
      }
    </div>

  );
};

export default Autocompletev02;
