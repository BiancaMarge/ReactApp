import './App.css';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from "react-datepicker";
import ro from 'date-fns/locale/ro';
import Age from './Age';
import V2 from './V2';
import Modal from 'react-modal';
registerLocale('ro', ro)

function App() {
  const[selectedDate1, setSelectedDate1]=useState(new Date());
  const[selectedDate2, setSelectedDate2]=useState(new Date());
  var[dataUTC, setdataUTC]=useState();
  var[unixtimestamp,setunixtimestamp]=useState();
  var[dataEngl,setdataEngl]=useState();
  var[dataRo, setdataRo]=useState();
  var[okVisibleUTSFunc, setOkVisibleUTSFunc]=useState(false);
  var[locale, setLocale]=useState("ro");
  var[timeCaption, setTimeCaption]=useState("Timp");
  var[dateFormat, setdateFormat]=useState("dd-MM-yyyy HH:mm");
  var[printNullDateForDetailData,setPrintNullDateForDetailData]=useState("");
  var[erorInputNumber,setErorInputNumber]=useState(" ");

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
  function closeModal(){
    setIsOpen(false);
  }

  const UnixTimeStampFunc = () => {
    if(selectedDate1!=null){

    const utcDate =selectedDate1.getUTCFullYear()+ "/"+parseInt(selectedDate1.getUTCMonth()+1)+ "/"+selectedDate1.getUTCDate()+ " "+ selectedDate1.getUTCHours()+ ":"+selectedDate1.getUTCMinutes()+ ":"+selectedDate1.getUTCSeconds();
    const utcDate2 =new Date(selectedDate1.getUTCFullYear(),selectedDate1.getUTCMonth()+1,selectedDate1.getUTCDate(), selectedDate1.getUTCHours(),selectedDate1.getUTCMinutes(),selectedDate1.getUTCSeconds());
    setdataUTC(utcDate);
    
    setunixtimestamp(utcDate2.getTime());

    const formattedDateEngl = Intl.DateTimeFormat('en-US',{
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour:'2-digit',
      minute:'2-digit'}).format(utcDate2);
      setdataEngl(formattedDateEngl);

    const formattedDateRo = Intl.DateTimeFormat('ro-RO',{
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour:'2-digit',
      minute:'2-digit'}).format(utcDate2);
      setdataRo(formattedDateRo);

    setOkVisibleUTSFunc(true);
    }else{
      setPrintNullDateForDetailData("Selectati o data din prima casuta");
    }
  }

  const ChangeLocal = ()=>{
    if(locale==="ro"){
      setLocale("en");
    }else{
      setLocale("ro");
    }

    if(timeCaption==="Timp"){
      setTimeCaption("Time");
    }else{
      setTimeCaption("Timp");
    }

    if(dateFormat==="dd-MM-yyyy HH:mm"){
      setdateFormat("dd-MM-yyyy h:mm aa");
    }else{
      setdateFormat("dd-MM-yyyy HH:mm");
    }
  }

  const[okVisiblenoDayV3, setOkVisiblenoDayV3]=useState(false);
  const [inputDayNoV3, setinputDayNoV3] = useState("");
  const [inputHoursNoV3, setinputHourV3] = useState("");
  const [inputMinNoV3, setinputMinV3] = useState("");
  const [display_inputs, setDisplay_inputs]=useState();

  var printMinute="minut", printHour="ora", printDay="zi";

  function transformData(){
    if(selectedDate1!=null){
      var ok=0;
      if(inputDayNoV3===null){
        setinputDayNoV3(0);
      }else{
        var sD = new String(inputDayNoV3);
      }
      if(inputHoursNoV3===null){
        setinputHourV3(0);
      }else{
        var sH = new String(inputHoursNoV3);
      }
      if(inputMinNoV3===null){
        setinputMinV3(0);
      }else{
        var sM = new String(inputMinNoV3);
      }
      if(inputDayNoV3<0 || inputHoursNoV3<0 || inputMinNoV3<0){
        setErorInputNumber("Trebuie sa introduci o valoare pozitiva");
        setIsOpen(true);
          ok++;
      }else{
        if((sD.charAt(0)==="0" && toString(sD).length>1) || (sH.charAt(0)==="0" && toString(sH).length>1) || (sM.charAt(0)==="0" && toString(sM).length>1)){
          setErorInputNumber("Numarul nu trebuie sa inceapa cu 0");
          setIsOpen(true);
            ok++;
        }else{
          var xD = Number(sD);
          var xH = Number(sH);
          var xM = Number(sM);
          console.log(xH);
          if((!Number.isInteger(xD) && xD!==0) || (!Number.isInteger(xH) && xH!==0)|| (!Number.isInteger(xM) && xM!==0)){
            setErorInputNumber("Trebuie sa introduci un numar natural");
            setIsOpen(true);
            ok++;
          }else{
              setOkVisiblenoDayV3(true)
              setErorInputNumber(" ");
              ok=0;
            }
        }
      }

      if(xM===1){
        printMinute="minut";
      }else{
        printMinute="minute";
      }
      
      if(xH===1){
        printHour="ora";
      }else{
        printHour="ore";
      }
      
      if(xD===1){
        printDay="zi";
      }else{
        printDay="zile";
      }

      if(xD===0){
        printDay="";
      }
      if(xH===0){
        printHour="";
      }
      if(xM===0){
        printMinute="";
      }

      if(ok===0){
        setDisplay_inputs(inputDayNoV3+" "+printDay+" "+inputHoursNoV3+" "+printHour +" "+inputMinNoV3 +" "+printMinute);
        var auxDate1=selectedDate1.getTime();
        var auxinputDayNoV3=inputDayNoV3*86400000+inputHoursNoV3*3600000+inputMinNoV3*60000;
        var auxDate2=auxDate1+auxinputDayNoV3;
        var newDate=new Date(auxDate2);
        setSelectedDate2(newDate);
      }
    }else{
      setErorInputNumber("Va rog sa selectati o data in primul camp");
      setIsOpen(true);
    }
  }


  return(
    <div className="App">
      <table> 
        <tr>
          <td className="flex-container">
            <h2>V1</h2>
            <h5 className="text-alaignV1">Selectati data nasterii din primul datetime picker</h5>
            <div className="App">
              <table>
                  <tr>
                    <td className="flex-container">
                    <DatePicker
                      selected={selectedDate1}
                      onChange={setSelectedDate1}
                      showTimeSelect
                      timeIntervals={5}
                      timeFormat="HH:mm"
                      timeCaption={timeCaption}
                      dateFormat={dateFormat}
                      locale={locale}
                    />
                    </td>

                    <td className="flex-container">
                      <DatePicker
                        selected={selectedDate2}
                        onChange={setSelectedDate2}
                        showTimeSelect
                        timeIntervals={5}
                        timeFormat="HH:mm"
                        timeCaption={timeCaption}
                        dateFormat={dateFormat}
                        locale={locale}
                      />
                    </td>
                  </tr>
              </table>
            </div>
          
            <div className="PrintAge">
                <Age selectedDate={selectedDate1}/>
            </div>
          
            <div className="btnStyle">
              <button onClick={ChangeLocal}>{locale==="ro" ? 'Schimba calendarul in engleza' : 'Schimba calendarul in romana'}</button>
            </div>
            <div className="btnStyle">
              <button onClick={UnixTimeStampFunc}>Detalii data</button>
            </div>
              <div> {okVisibleUTSFunc && (selectedDate1!==null) ? 
                                <div> <p>Data selectata transformata in utc: {dataUTC}</p> 
                                      <p>Data selectata, transformata in UTC si afista in unix timestamp: {unixtimestamp}</p>
                                      <p>Data selectata, transformata in UTC si afista in limba engleza: {dataEngl}</p>
                                      <p>Data selectata, transformata in UTC si afista in limba romana: {dataRo}</p>
                                </div>
                                : printNullDateForDetailData}
                
              </div>
          </td>
          <td className="flex-container">
            <div>
              <h2>V2</h2>
              <V2 sd1={selectedDate1} sd2={selectedDate2}/>
            </div>
          </td>

          <td className="flex-container">
            <div>
              <h2>V3</h2>
              <div>
                <form>
                  <label><div>Introduceti un numar de zile:  
                    <input type="text" maxlength="5" onChange={event => setinputDayNoV3(event.target.value)}/> </div>
                    <div>
                    Introduceti un numar de ore:
                    <input type="text" maxlength="5" onChange={event => setinputHourV3(event.target.value)}/></div>
                    <div>
                    Introduceti un numar de minute:
                    <input type="text" maxlength="5" onChange={event => setinputMinV3(event.target.value)}/></div>
                  </label>
                </form>

                <button onClick={transformData}>Preselectie</button>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  style={customStyles}
                >
                  <p>{erorInputNumber}</p>
                  <button onClick={closeModal}>Close</button>
                </Modal>
                <div>{ okVisiblenoDayV3 && <p>Ati introdus {display_inputs}</p>} </div>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default App;