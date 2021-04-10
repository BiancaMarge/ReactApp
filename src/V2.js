import './App.css';
import React, { useState } from 'react';

const V2 = (props) => {
    //props.date.toLocaleTimeString()
    const data1=props.sd1;
    const data2=props.sd2;
    const[data, setData]=useState();
    const[ok, setOk]=useState();
    const[ok2, setOk2]=useState(false);

    const V2_1a =()=>{
        if(data1.getTime()>data2.getTime()){
            setData(data1.getTime()-data2.getTime());
        }else{
            setData(data2.getTime()-data1.getTime());
        }
        setOk2(true)
    }

    const V2_1b =()=>{
        if(data1.getTime()>data2.getTime()){
            setOk("Date1 e mai mare");
        }else{
            if(data1.getTime()<data2.getTime()){
                setOk("Date2 e mai mare");
            }else{
                setOk("Date1 si Date2 sunt egale");
            }
        }
        
    }

    return (
        <div className="App">
            <button onClick={V2_1a}>Afiseaza intervalul de timp</button>
            {ok2 && <div><p>Intervalul intre data1 si data2 este de: {data} milisecunde</p>
                  <p>Intervalul intre data1 si data2 este de: {data/1000} secunde</p>
                  <p>Intervalul intre data1 si data2 este de: {parseInt(data/86400000)} zile</p></div>}

            <button onClick={V2_1b}>Afiseaza care datetime este mai mare</button>
            <p>{ok}</p>
        </div>
    );
}
export default V2;