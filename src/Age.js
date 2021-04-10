import './App.css';
import React, { useState } from 'react';

const Age = (props) => {
  const data=props.selectedDate;

  var[selectedAge, setSelectedAge]=useState('0');
  var currentDate=new Date();

  var age_now = currentDate.getFullYear() - data.getFullYear();
  var month = currentDate.getMonth() - data.getMonth();
  var nani1=(currentDate.getMonth()-data.getMonth());
  var nani2=(12-data.getMonth()+currentDate.getMonth()).toString();

  const Varsta = () => {
    if (month < 0 || (month === 0 && currentDate.getDate() < data.getDate())) 
    {
        age_now--;
    }
    setSelectedAge(age_now);
    if(selectedAge===0 && (data.getFullYear()===currentDate.getFullYear())){
      window.alert("Are " + nani1 +" luni");
    }
    if(selectedAge===0 && (data.getFullYear()===currentDate.getFullYear()-1)){
      window.alert("Are " + nani2 +" luni");
    }
  }

  const handlerClick=()=>{  
    if (selectedAge<18 ) {
      window.alert("Nu ai peste 18 ani");
    }
    else{
      window.alert("Ai peste 18 ani");
    }
  }

  return ( 
    <div>

      <div >
        <button onClick={Varsta}>Varsta</button>
        <p>Varsta ta este: {selectedAge} ani</p>
      </div>
      <div className="btnStyle">
        <button onClick={handlerClick}>Ai peste 18 ani?</button>
      </div>
    </div>
    
    );
}
 
export default Age;