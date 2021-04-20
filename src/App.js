import './App.css';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from "react-datepicker";
import ro from 'date-fns/locale/ro';
import Age from './Age';
import V2 from './V2';
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

  const UnixTimeStampFunc = () => {

    const utcDate = new Date(Date.UTC(selectedDate1.getFullYear(), selectedDate1.getMonth(),selectedDate1.getDate(), selectedDate1.getHours(),selectedDate1.getMinutes(),selectedDate1.getSeconds()));
    setdataUTC(utcDate.toUTCString());
    
    setunixtimestamp(selectedDate1.getTime());

    const formattedDateEngl = Intl.DateTimeFormat('en-US',{
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour:'2-digit',
      minute:'2-digit'}).format(selectedDate1);
      setdataEngl(formattedDateEngl);

    const formattedDateRo = Intl.DateTimeFormat('ro-RO',{
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour:'2-digit',
      minute:'2-digit'}).format(selectedDate1);
      setdataRo(formattedDateRo);

    setOkVisibleUTSFunc(true);
  }

  const ChangeLocal = ()=>{
    if(locale==="ro"){
      setLocale("en");
    }else{
      setLocale("ro");
    }
  }

  const[okVisiblenoDayV3, setOkVisiblenoDayV3]=useState(false);
  const [inputDayNoV3, setinputDayNoV3] = useState();
  const [inputHoursNoV3, setinputHourV3] = useState();
  const [inputMinNoV3, setinputMinV3] = useState();

  function transformData(){
    var sD = new String(inputDayNoV3);
    var sH = new String(inputHoursNoV3);
    var sM = new String(inputMinNoV3);
        if(inputDayNoV3<0 || inputHoursNoV3<0 || inputMinNoV3<0){
        window.alert("Trebuie sa introduci o valoare pozitiva")
    }else{
        if(!inputDayNoV3 || !inputHoursNoV3 || !inputMinNoV3){
            window.alert("Trebuie sa introduci o valoare")
        }else{
            if(sD.charAt(0)==="0" || sH.charAt(0)==="0" || sM.charAt(0)==="0"){
                window.alert("Numarul nu trebuie sa inceapa cu 0");
            }else{
              let xD = Number(inputDayNoV3);
              let xH = Number(inputHoursNoV3);
              let xM = Number(inputMinNoV3);
              if(!Number.isInteger(xD) || !Number.isInteger(xH) || !Number.isInteger(xM)){
                window.alert("Trebuie sa introduci un numar natural");
              }else{
                setOkVisiblenoDayV3(true)
              }
            }
          }
        }
      var auxDate1=selectedDate1.getTime();
      var auxinputDayNoV3=inputDayNoV3*86400000+inputHoursNoV3*3600000+inputMinNoV3*60000;
      var auxDate2=auxDate1+auxinputDayNoV3;
      var newDate=new Date(auxDate2);
      setSelectedDate2(newDate);
  }


  return(
    <div className="App">
      <table> 
        <tr>
          <td className="flex-container">
            <h2>V1</h2>
            <h5>Selectati data nasterii</h5>
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
                      timeCaption="Time"
                      dateFormat="dd-MM-yyyy h:mm aa"
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
                        timeCaption="Time"
                        dateFormat="dd-MM-yyyy h:mm aa"
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
              <div> {okVisibleUTSFunc && <div> <p>Data selectata transformata in utc: {dataUTC}</p> 
                                <p>Data selectata afista in unix timestamp: {unixtimestamp}</p>
                                <p>Data selectata afista in limba engleza: {dataEngl}</p>
                                <p>Data selectata afista in limba romana: {dataRo}</p></div>}
                
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
                  <label>Introduceti un numar de zile:  
                    <input type="number" onChange={event => setinputDayNoV3(event.target.value)}/> 
                    Introduceti un numar de ore:
                    <input onChange={event => setinputHourV3(event.target.value)}/>
                    Introduceti un numar de minute:
                    <input onChange={event => setinputMinV3(event.target.value)}/>
                  </label>
                </form>

                <div>{ okVisiblenoDayV3? <p>Ati introdus {inputDayNoV3} zile, {inputHoursNoV3} ore</p> : null }</div>
                <button onClick={transformData}>Preselectie</button>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default App;