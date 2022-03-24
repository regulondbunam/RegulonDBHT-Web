import React, { useState } from "react";
import './Autocomplete02.css'

const Autocompletev02 = ({ suggestions,id}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");

  const onChange = (e) => {
    const userInput = e.target.value;

    // Filter our suggestions that don't contain the user's input
    const unLinked =Array.isArray(suggestions) ? suggestions.filter(
      (suggestion) =>
        {
          if(typeof(suggestion) === 'string'){
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
    </div>
  );
};

export default Autocompletev02;
