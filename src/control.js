import React from 'react';
import './App.css';

function Controller(props) {

    let Data = function(date, value)
    {
        this.date = date;
        this.value = value
    }    
    let colors = ["red", "yellow", "green", "blue","black","gray"];

    function addChart(){    
        let newInfo = props.info.slice();
        newInfo.push(new Data(props.date, props.value))
        props.setInfo(newInfo);
        console.log(props.info)
    }

    return (
        <div className = "controller">
            <div className = "get-info">
                <h2>date</h2>
                <input onChange = {e => props.setDate(e.target.value)}/>
                <h2>value</h2>
                <input onChange = {e => props.setValue(e.target.value)}/>
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
                    <button 
                        className = "submit"
                        onClick = {addChart}
                    >
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
  );
}

export default Controller;
