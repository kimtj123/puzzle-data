import React, { useState } from 'react';
import './App.css';
import Controller from './control';
import { elementOfAxis, rectMaker } from './helperFuncion'

function App() {

  let Yunit = [0,50,100,150,200,250,300,350,400,450,500]

  const [info, setInfo] = useState([]);
  const [date, setDate] = useState("");
  const [value, setValue] = useState(0);


  // transform은 상위 요소를 기준으로 결정된다. css에서 상위 relative, 하위 absolute와 유사한 움직임        

  return (
    <div className="App">     
      <svg width="1000" height="550">
        <g className = "x axis" transform="translate(60,450)"> 
          {info.map((val,i) => elementOfAxis(val.date,i))} 
          <path d="M0,6 V0 H900 V6" class="domain" /> 
        </g>
        <g className = "y axis" transform="translate(60,50)">
          {Yunit.map((val,i) => elementOfAxis(val,i))} 
          <path d="M-6,0 H0 V400 H-6" class="domain" />
        </g>
      </svg>
      <Controller 
      info = {info} 
      date = {date}
      value = {value}
      setInfo = {setInfo}
      setDate = {setDate}
      setValue = {setValue}
      />
    </div>
  );
}

export default App;

/**
 * <g> : 프레젠테이션 속성을 상속하는데 사용
 * <path> : 요소 경로를 정의, 축을 그리는데 사용 / 참고 : http://blog.naver.com/PostView.nhn?blogId=pjh445&logNo=220045621716
 */


// let info = [
//   {
//     date : "2019-01", 
//     value : 0 
//   },
//   {
//     date : "2019-02", 
//     value : 50 
//   },
//   {
//     date : "2019-03", 
//     value : 100 
//   },
//   {
//     date : "2019-04", 
//     value : 150 
//   },
//   {
//     date : "2019-05", 
//     value : 200 
//   },
//   {
//     date : "2019-06", 
//     value : 250 
//   },
//   {
//     date : "2019-07", 
//     value : 300 
//   },
// ]  