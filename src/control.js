import React from 'react';
import './App.css';
import { addChart, deleteInfo, updateInfo } from './helperFunction'
function Controller({
    info,date,value,pickDate, pickValue,// 값
    valueChanger, setInfo,setDate,setValue,setColor, // 함수
    }) {
    let colors = ["red", "steelblue", "green", "blue","black","gray"];    

    return (
        <div className = "controller">
            <div className = "get-info">
                <h2>date</h2>
                <input 
                    onChange = {e => {setDate(e.target.value)}}
                    placeholder = "YYYY-MM"
                />
                <h2>value</h2>
                <input onChange = {e => setValue(e.target.value)}
                    placeholder = "숫자를 입력해주세요."
                />
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
                        onClick = {(e) => setColor(e.target.style.background)}
                        >
                        </button>
                    </li>            
                    )
                    }                
                </ul>   
            </div>
            <div className = "get-info" style = {{paddingTop : "20px"}}>  
                <div style = {{display : "flex", marginBottom : "20px"}}>
                    <h3 className = "submit">선택한 날짜<br/>{pickDate}</h3>
                    <h3 className = "submit">선택한 값<br/>{pickValue}</h3>
                </div>
                <div className = "submit-wrapper">
                    <button 
                        className = "submit"
                        onClick = {()=>addChart(info, date, value, setInfo)}
                    >
                        등록
                    </button>                      
                </div>
                <div className = "submit-wrapper">
                    <button 
                        className = "submit"
                        onClick = {()=>updateInfo(info, date, value, pickDate, setInfo, valueChanger)}
                    >
                        변경
                    </button>                      
                </div>
                <div className = "submit-wrapper">
                    <button 
                        className = "submit" 
                        onClick = { ()=>{ deleteInfo(info,pickDate,setInfo) }} >
                        삭제
                    </button>                      
                </div>
            </div>        
        </div>
  );
}

export default Controller;
