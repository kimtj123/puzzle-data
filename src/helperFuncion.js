import React from 'react';

export function elementOfAxis(value,i) // x 축과 y 축 생성
{
    let standardX = 60;
    let standardY = 400;
    let gapX = 76.4;
    let gapY = 40;
    let resultX = standardX + gapX*i;
    let resultY = standardY - gapY*i;
    
    if(typeof value === "number")
      return (
        <g class="tick" transform={`translate(0,${resultY})`} style={{opacity: 1}}>
          <line x2="-6" y2="0"></line>
          <text dy=".32em" x="-9" y="0" style={{textAnchor: "end"}}>{value}</text>
        </g>     
      )
    else if(typeof value === "string")
        return (
        <g class="tick" transform={`translate(${resultX},0)`} style={{opacity: 1}}>
          <line y2="6" x2="0"></line>
          <text transform="rotate(-90)"  dx="-.8em"  dy=".45em" y2="6" x2="0" style={{textAnchor: "end"}}>{value}</text>
        </g>     
        )
}

export function rectMaker(value,i) // 사각형 만들기
{    
    let maxHeight = 450;       
    let basicXlocation = 103;
    let Xgap = 76;
    let Xlocation = basicXlocation + Xgap*i;
    let Ylocation = maxHeight - value;
    
   return (
        <rect 
        x={Xlocation} // 갭 76
        width="36" 
        y={Ylocation}   // 합이 450 에서 머물러야 한다.
        height={value}        
    />  
   )
}