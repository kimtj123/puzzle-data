import React from 'react';

let dateForm = /^(19[7-9][0-9]|20\d{2})-(0[0-9]|1[0-2])$/; // 날짜형식 검사
let numberChk = /^(\s|\d)+$/; // 숫자인지 검사

export function addChart(info,date,value,setState)
{
    let Data = function(date, value) // constructor
    {
        this.date = date;
        this.value = value;
    }    
    Data.prototype = 
    {
        changeDate : function(date){
            this.date = date;
        },
        changeValue : function(value){
            this.value = value;
        },          
    }    
    
    if(!dateForm.test(date))
    {
        alert("날짜형식이 올바르지 않습니다.")
        return;
    }
    else if(!numberChk.test(value)){
        alert("숫자를 입력해주시기 바랍니다.")
        return;
    }
    let newInfo = info.slice(); 
    let newData = new Data(date, Number(value));    
    
    if(check(newInfo,newData))
    {
        newInfo.push(newData) 
        newInfo.sort(function(a,b){ // 날짜별로 정렬
            let dateA = a.date
            let dateB = b.date
            if (dateA < dateB) 
            {
                return -1;
            }
            if (dateA > dateB) 
            {
                return 1;
            }                
                // 이름이 같을 경우
                return 0;
        })
        setState(newInfo);                    
    }
    else{
        alert("날짜가 중복되었습니다.") 
    }
}

export function elementOfAxis(value,i,adjY) // x 축과 y 축 생성
{
    adjY = adjY || 0;
    let standardX = 60;
    let standardY = 400;
    let gapX = 76.4;
    let gapY = 50;
    let resultX = standardX + gapX*i;
    let resultY = standardY - gapY*i;
    
    if(typeof value === "number") // Y축
      return (
        <g className="tick" transform={`translate(0,${resultY + adjY*50})`} style={{opacity: 1}} key = {"tick" + i}>
          <line x2="-6" y2="0"></line>
          <text dy=".32em" x="-9" y="0" style={{textAnchor: "end"}}>{value}</text>
        </g>
      )
    else if(typeof value === "string") // X축
        return (
        <g className="tick" transform={`translate(${resultX},0)`} style={{opacity: 1}}  key = {"tick" + i}>
          <line y2="6" x2="0"></line>
          <text transform="rotate(-90)"  dx="-.8em"  dy=".45em" y2="6" x2="0" style={{textAnchor: "end"}}>{value}</text>
        </g>     
        )
}

export function rectMaker(val,index,color, adjY, setDate, setValue) // 사각형 만들기
{        
    let maxHeight = 470;       
    let basicXlocation = 103;
    let Xgap = 76;
    let Xlocation = basicXlocation + Xgap*index;
    let Ylocation = maxHeight - val.value;
    
   return (
        <rect 
            id = {val.date}
            x={Xlocation} // 갭 76
            width="36" 
            y={Ylocation + adjY}
            height={val.value}       
            style={{fill: color}}
            onClick = {(e)=>
            {           
                let id = e.target.id 
                setDate(id);                
                setValue(val.value);
            }}
    />  
   )
}



export function overflowAxisX(info)     // X축 길이 조정
{
    let basicLength = 900;
    let overflow = info.length - 12
    let adjLength = basicLength + overflow*76;

    if(info.length < 12) 
    {
      return  <path d={`M0,6 V0 H${basicLength} V6`} className="domain" /> 
    }
    else
    {
        return  <path d={`M0,6 V0 H${adjLength} V6`} className="domain" /> 
    }
}

export function overflowAxisY(info)
{
    let basicVal = 400;    
    let valueBox = [];
    let biggestVal;          
    let Yunit = [0,50,100,150,200,250,300,350,400];

    info.forEach((val) => valueBox.push(val.value));    
    biggestVal = Math.max.apply(null, valueBox);    // valueBox의 값 중 가장 큰 값

    if(biggestVal <= 400) // 기본값 400을 넘기지 않을 경우
    {
        return  (
            <g className = "y axis" transform="translate(60,70)">
                {Yunit.map((val,i) => elementOfAxis(val,i))} 
                <path d={`M-6,0 H0 V${basicVal} H-6`} className="domain" />
            </g>
        )
    }
    else
    {
        let adjUnit  = Math.floor((biggestVal / 50)-7);
        let adjVal  = basicVal + adjUnit*50            
        for(let i = 0; i < adjUnit; i++) // biggestVal의 값에 맞춰 tick 추가
        {
            Yunit.push(400 + (i+1)*50)
        }

        return  (
            <g className = "y axis" transform={`translate(60,20)`}>
                {Yunit.map((val,i) => elementOfAxis(val,i,adjUnit))} 
                <path d={`M-6,0 H0 V${adjVal} H-6`} className="domain" />
            </g>
        )
    }
}

export function updateInfo(info,newDate,newVal,pickDate,setInfo,valueChanger)
{
    if(check(info,newDate))
    {   
        if(newDate !== pickDate) // 같은 날짜일 경우 수정이 되어야 함
        {
            alert("날짜가 중복되었습니다.")
            return;
        }
    }

    if(!dateForm.test(newDate))
    {
        alert("날짜형식이 올바르지 않습니다.")
        return;
    }
    else if(!numberChk.test(newVal)){
        alert("숫자를 입력해주시기 바랍니다.")
        return;
    }

    let newInfo = info.slice();
    newInfo.forEach((val) => {
        
        if(pickDate === val.date){
            val.changeDate(newDate) // 프로토타입 메소드
            val.changeValue(newVal) // 프로토타입 메소드
            valueChanger(newVal);
        }
    })
    setInfo(newInfo);
    
}


export function deleteInfo(info,pickDate,setState)
{
    let newInfo = info.slice();
    newInfo = newInfo.filter(val => val.date !== pickDate);    
    setState(newInfo);
}


function check(info,newDate) // 일치하는 날짜가 있는지 검사
{
    let result = true;

    info.forEach((val) => 
    {              
        if(val.date === newDate.date)
        {
            result = false;
            return result;
        }                                
    })

    return result
}