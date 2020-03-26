import React, { useState, useEffect } from 'react';
import './App.css';
import Controller from './control';
import { elementOfAxis, rectMaker, overflowAxisX, overflowAxisY } from './helperFunction'
// import CSV from './data'

function App() {

  // setState를 pseudo-classical 방식으로 배치해야 한다.

  const [info, setInfo] = useState([]); // 저장된 데이터
  const [date, setDate] = useState(""); // 입력받을 날짜
  const [value, setValue] = useState(0); // 입력받을 값
  const [color, setColor] = useState("red"); // 막대색깔
  const [pickDate, dateChanger] = useState("");
  const [pickValue, valueChanger] = useState("");
  // transform은 상위 요소를 기준으로 결정된다. css에서 상위 relative, 하위 absolute와 유사한 움직임        
  // viewBox = "<min-x>, <min-y>, <width>, <height>"


  // x축 값 변경 관련
  let overX = info.length - 11;
  let Xgap = 76.4;
  let viewX = info.length < 13 ? 1000 : 1000 + overX*Xgap;

  // y축 값 변경 관련
  let valueBox = [];
  info.forEach((val) => valueBox.push(val.value));      
  let biggestVal = Math.max.apply(null, valueBox)
  let overY = Math.floor((biggestVal / 50));  // Y 값이 초과할 때 곱해줘야 할 값
  let Ygap = 50; // 기본 단위
  let viewY = overY*50 <= 400 ? 550 : 550 + (overY-8)*Ygap; // 400이 기본값이므로 -8

  let adjY =  overY <= 8 ? 0 : (overY - 8)*50 // 기본값이 넘을 시 위치조정

  return (
    <div className="App">     
      <div className = "wrapper">
        <svg width="1000" height="550" viewBox = {`0,0,${viewX},${viewY}`}>
          <g className = "x axis" transform={`translate(60,${470+adjY})`}> 
            { info.map((val,i) => elementOfAxis(val.date,i)) }
            { overflowAxisX(info) }
          </g>
            { overflowAxisY(info) } 
            {
              info.map((val,i) => {
                return rectMaker(
                  val,i, color, adjY,
                  dateChanger, valueChanger)
              })
            }
        </svg>       
      </div>
      <Controller 
        info = {info} 
        date = {date}
        value = {value}      
        pickDate = {pickDate}
        pickValue = {pickValue}
        setInfo = {setInfo}
        setDate = {setDate}
        setValue = {setValue}
        setColor = {setColor}        
        valueChanger = {valueChanger}
      />
    </div>
  );
}

export default App;

/**
 * <g> : 프레젠테이션 속성을 상속하는데 사용
 * <path> : 요소 경로를 정의, 축을 그리는데 사용 / 참고 : http://blog.naver.com/PostView.nhn?blogId=pjh445&logNo=220045621716
 */
