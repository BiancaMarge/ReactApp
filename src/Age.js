import './App.css';
import React, { useState } from 'react';
import Modal from 'react-modal';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

const Age = (props) => {
  const data=props.selectedDate;

  var[selectedYear, setSelectedYear]=useState();
  var currentDate=new Date();
  var[okVisibleAge,setOkVisibleAge]=useState(false);
  var [printAge, setPrintAge]=useState(" ");
  var[printNullData1,setPrintNullData1]=useState("Apasati butonul varsta de mai sus pentru a va afla varsta");

  var printYear, printMonth, printDay;

  const Varsta = () => {
    if(data!=null){
    var afisVarsta=" ";
    var new_Date=new Date();
    new_Date.setMilliseconds(0);
    new_Date.setSeconds(0);
    new_Date.setMinutes(0);
    new_Date.setHours(0);
    new_Date.setDate(1);
    new_Date.setMonth(0);
    new_Date.setFullYear(0);

    var diff=currentDate.getTime()-data.getTime();
    new_Date.setMilliseconds(diff+new_Date.getMilliseconds())

    var ani=new_Date.getFullYear();
    var luni=new_Date.getMonth();
    var zile=new_Date.getDate();
    
    if(ani!==1){
      printYear="ani";
    }else{
      printYear="an";
    }

    if(luni!==1){
      printMonth="luni";
    }else{
      printMonth="luna";
    }

    if(zile!==1){
      printDay="zile";
    }else{
      printDay="zi";
    }
    afisVarsta="Varsta este: "
    if(data.getFullYear()>currentDate.getFullYear() || 
    (data.getFullYear()===currentDate.getFullYear() && data.getMonth()>currentDate.getMonth()) || 
    (data.getFullYear()===currentDate.getFullYear() && data.getMonth()===currentDate.getMonth() && data.getDate()>currentDate.getDate()) ||  
    (data.getFullYear()===currentDate.getFullYear() && data.getMonth()===currentDate.getMonth() && data.getDate()===currentDate.getDate() && data.getHours()>currentDate.getHours()) ||
    (data.getFullYear()===currentDate.getFullYear() && data.getMonth()===currentDate.getMonth() && data.getDate()===currentDate.getDate() && data.getHours()===currentDate.getHours() && data.getMinutes()>currentDate.getMinutes()) )
    {
      afisVarsta="Data selectata e o zi din viitor";
    }else{
      if(ani!==0){
          afisVarsta=afisVarsta+" "+ani+" "+ printYear;
      }
      if(luni!==0){
        afisVarsta=afisVarsta+" "+luni+" "+ printMonth;
      }
      if(zile!==0){
        afisVarsta=afisVarsta+" "+zile+" "+ printDay;
      }
    }
    setSelectedYear(ani);
    console.log(afisVarsta);
    setPrintAge(afisVarsta);
    setOkVisibleAge(true);
  }else{
    setPrintNullData1("Selectati o data din prima casuta");
  }
}


  //Modal
  const customStyles = {
    content : {
      top : '50%',
      left : '50%',
      right : 'auto',
      bottom : 'auto',
      marginRight : '-50%',
      transform  : 'translate(-50%, -50%)'
    }
  };

  const [modalIsOpen,setIsOpen] = useState(false);
  var [modalData, setModalData]=useState();

  const handlerClick=()=>{
    setOkVisibleAge(false);
    setIsOpen(true);
    if(okVisibleAge===false){
      setModalData("Trebuie sa apasati butonul Varsta de mai sus");
    }else{
      if (selectedYear<18 ) {
        setModalData("Nu ai peste 18 ani");
      }
      else{
        setModalData("Ai peste 18 ani");
      }
      setOkVisibleAge(true);
    } //style={{width:250, height: 80, marginTop:20, marginLeft:150}}
  }

  function closeModal(){
    setIsOpen(false);
  }
  return ( 
    <div>

      <div >
        <button onClick={Varsta}>Varsta</button>
        {okVisibleAge===false ?
        <div><ReactPlaceholder color="black" ready={true} rows={1} type='text' style={{width:250, height: 80, marginTop:20, marginLeft:150}}> 
          <p> {printNullData1}</p>
        </ReactPlaceholder>
        </div> : <p> {printAge}</p>}
      </div>
      <div className="btnStyle">
        <button onClick={handlerClick}>Ai peste 18 ani?</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <h2>{modalData}</h2>
          <button onClick={closeModal}>Close</button>
        </Modal>
      </div>
    </div>
  );
}
 
export default Age;