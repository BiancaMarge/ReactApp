import './App.css';
import React, { useState } from 'react';

const V2 = (props) => {
    const data1=props.sd1;
    const data2=props.sd2;
    const[visibleV2b, setvisibleV2b]=useState();
    const[visibleV2a, setvisibleV2a]=useState(false);

    var getDaysInMonth = function(month,year) {
       return new Date(year, month+1, 0).getDate();
      };

   const getIntervalBetweenDates=(date_1, date_2)=>
    {
        var date2_UTC = new Date(Date.UTC(date_2.getUTCFullYear(), date_2.getUTCMonth(), date_2.getUTCDate(), date_2.getHours(), date_2.getMinutes()));
        var date1_UTC = new Date(Date.UTC(date_1.getUTCFullYear(), date_1.getUTCMonth(), date_1.getUTCDate(), date_1.getHours(), date_1.getMinutes()));

        let yAddText, mAddText, dAddText;
        yAddText="an";
        mAddText="luna";
        dAddText="zi";
        
        var days = date2_UTC.getDate() - date1_UTC.getDate();
        if (days < 0)
        {
            date2_UTC.setMonth(date2_UTC.getMonth() - 1);
            days += getDaysInMonth(date2_UTC.getMonth(),date2_UTC.getFullYear());
        }

        var months = date2_UTC.getMonth() - date1_UTC.getMonth();
        if (months < 0)
        {
            date2_UTC.setFullYear(date2_UTC.getFullYear() - 1);
            months += 12;
        }

        var years = date2_UTC.getFullYear() - date1_UTC.getFullYear();

        if(days>1)
        {
            dAddText="zile";
        }
        if(months>1)
        {
            mAddText="luni";
        }
        if(years>1)
        {
            yAddText="ani";
        }
        var hours;
        if(date1_UTC.getHours()>date2_UTC.getHours()){
            hours=date1_UTC.getHours()-date2_UTC.getHours();
        }else{
            hours=date2_UTC.getHours()-date1_UTC.getHours();
        }
        return years + yAddText+ ", " + months + mAddText+", " + days + dAddText + ", ore " +hours;
    }

    const V2_1a =()=>{
       
        setvisibleV2a(true)
    }

    const V2_1b =()=>{
        if(data1.getTime()>data2.getTime()){
            setvisibleV2b("Date1 e mai mare");
        }else{
            if(data1.getTime()<data2.getTime()){
                setvisibleV2b("Date2 e mai mare");
            }else{
                setvisibleV2b("Date1 si Date2 sunt egale");
            }
        }
        
    }

    return (
        <div className="App">
            <button onClick={V2_1a}>Afiseaza intervalul de timp</button>
            {visibleV2a && <div>
                <p>Intervalul intre date1 si date2 este</p>
                <p>{getIntervalBetweenDates(data1,data2)}</p>
            </div>}

            <button onClick={V2_1b}>Afiseaza care datetime este mai mare</button>
            <p>{visibleV2b}</p>
        </div>
    );
}
export default V2;