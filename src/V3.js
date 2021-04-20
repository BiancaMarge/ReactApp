/*import './App.css';
import React, { useState } from 'react';
import App from './App';
const V3 =(props)=>{
    const data1=props.sd1;
    const[okV3, setOkV3]=useState(false);
    const [dayNo, setDayNo] = useState();
    var x
    function getData(event){
        setDayNo(event.target.value);
        setOkV3(false);
    }
    function getFeedback(){
        var s = new String(dayNo);
        if(dayNo<0){
            window.alert("Trebuie sa introduci o valoare pozitiva")
        }else{
            if(!dayNo){
                window.alert("Trebuie sa introduci o valoare")
            }else{
                if(s.charAt(0)==="0"){
                    window.alert("Numarul nu trebuie sa inceapa cu 0");
                }else{
                    setOkV3(true)
                }
                
            }
        }
    }
    function transformData(){
        //console.log(data1.getTime());
        var auxDate1=data1.getTime();
        var auxdayNo=dayNo*86400000;
        var auxDate2=auxDate1+auxdayNo;
        x=new Date(auxDate2);
    }
    return(
        <div>
            <p>V3_1a</p>
            <form>
                <label>Introduceti un numar de zile:
                    <input type="number" onChange={getData}/> 
                </label>
            </form>
            <button onClick={getFeedback}>Submit</button>
            <div>{ okV3? <p>{dayNo}</p> : null }</div>
            <p>V3_1b</p>
            <button onClick={transformData}>Preselectie</button>
        </div>
    );
}
export default V3;*/