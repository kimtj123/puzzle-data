import React from 'react';
import './App.css';

function App() {
  let colors = ["red", "yellow", "green", "blue","black","gray"];
  return (
    <div className="App">     
      <svg width="1000" height="500">
        
      </svg>
      <div className = "controller">
        <div className = "get-info">
          <h2>date</h2>
          <input />
          <h2>value</h2>
          <input />
        </div>
        <div className = "get-info">      
          <h2>pick color</h2>
          <ul className = "select-color">
            {
              colors.map((val, index) => 
              <li className = {`color`} 
                key = {"color" + index}                
                >
                <button 
                  className = "color-button"
                  type = "button"
                  style = {{background : val}}
                  onClick = {() => console.log("click!")}
                >
                </button>
              </li>            
              )
            }                
          </ul>   
        </div>
        <div className = "get-info" style = {{paddingTop : "80px"}}>     
          <div className = "submit-wrapper">
            <button className = "submit">
              등록 / 변경
            </button>                      
          </div>
          <div className = "submit-wrapper">
            <button className = "submit">
              삭제
            </button>                      
          </div>
        </div>        
      </div>
    </div>
  );
}

export default App;
