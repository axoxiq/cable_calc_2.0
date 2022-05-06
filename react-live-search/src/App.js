import {useEffect, useState} from 'react';
import React, { Component } from 'react';
import './App.css';
import Select from 'react-select';


function App() {
  const [characters, setCharacters] = useState()
    const [query, setQuery] = useState("")
    const [selectedOption, setSelectedOption] = useState(null);
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' },
    ];
    
    useEffect(() => {
      const fetchData = async () => {
        try {
                const data = await fetch('http://127.0.0.1:3000/', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  body: JSON.stringify({search: query})                 
                }).then (res => res.json()).then(res =>  res = res.response);
                let temp = [];
                 for(let i = 0; i < data.length; i++) {
                  temp.push({value: data[i], label: data[i]})
                 }
                 console.log(temp)
                 setCharacters(temp)
            } catch (error) {
                console.error(error)
            }
        
      }
      if (query.length > 2) {
        fetchData()
      } else {
        setCharacters([{value: 1, label: "Поиск от трех букв. Например: х.."}])
      }
    }, [query])
  

    const onChangeHandler = (value) => {
          if(value.length > 2){ 
        setQuery(value)
        console.log(query)
       } else {
      setQuery(value)
                }
              }
   console.log(1, characters);
    return (
        <div className="App" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <div className="search" >                   
          
                    
                    <Select
                     defaultValue={selectedOption} 
                      options={characters}
                      noOptionsMessage={() => 'Марка не найдена!'}
                      placeholder={"Search Character"}
                       className={"input"}
                       onInputChange={value => onChangeHandler(value)}
                       data-value={query}
                      />
                    
          
            
            </div>
        </div>
    );
}


export default App;