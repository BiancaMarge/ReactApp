import './App.css';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from "react-datepicker";
import ro from 'date-fns/locale/ro';
import Age from './Age';
import V2 from './V2';
registerLocale('ro', ro)

function App(props) {
  const[selectedDate1, setSelectedDate1]=useState(new Date());
  const[selectedDate2, setSelectedDate2]=useState(new Date());
  var currentDate=new Date();
  var[dataUTC, setdataUTC]=useState();
  var[unixtimestamp,setunixtimestamp]=useState();
  var[dataEngl,setdataEngl]=useState();
  var[dataRo, setdataRo]=useState();
  var[ok, setOk]=useState(false);
  var[locale, setLocale]=useState("ro");

  //transformati inputul primit in utc si afisati-l in unix timestamp
  const UnixTimeStampFunc = () => {

    //trasnformat in utc
    const utcDate = new Date(Date.UTC(selectedDate1.getFullYear(), selectedDate1.getMonth(),selectedDate1.getDate(), selectedDate1.getHours(),selectedDate1.getMinutes(),selectedDate1.getSeconds()));
    setdataUTC(utcDate.toUTCString());
    
    //afisati-l in unix timestamp
    setunixtimestamp(selectedDate1.getTime()); //milliseconds

    //in engleza
    const formattedDateEngl = Intl.DateTimeFormat('en-US',{
      year: 'numeric',
      month: 'long',
      day: '2-digit' }).format(selectedDate1);
      setdataEngl(formattedDateEngl);

    //in romana
    const formattedDateRo = Intl.DateTimeFormat('ro-RO',{
      year: 'numeric',
      month: 'long',
      day: '2-digit' }).format(utcDate);
      setdataRo(formattedDateRo);

    setOk(true);
  }

  const ChangeLocal = ()=>{
    if(locale==="ro"){
      setLocale("en");
    }else{
      setLocale("ro");
    }
  }

  //-------------------------------------------------------------------------
  //V3
  const[okV3, setOkV3]=useState(false);
  const [dayNo, setDayNo] = useState();

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
              }}}}

  function transformData(){
      //console.log(selectedDate1.getTime());
      var auxDate1=selectedDate1.getTime();
      var auxdayNo=dayNo*86400000;
      var auxDate2=auxDate1+auxdayNo;
      var x=new Date(auxDate2);
      setSelectedDate2(x);
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
                      maxDate={currentDate}
                      dateFormat="dd-MM-yyyy"
                      locale={locale}
                      //date.toLocaleTimeString()
                    />
                    </td>

                    <td className="flex-container">
                      <DatePicker
                        selected={selectedDate2}
                        onChange={setSelectedDate2}
                        maxDate={currentDate}
                        dateFormat="dd-MM-yyyy"
                        locale={locale}
                      />
                    </td>
                  </tr>
              </table>
            </div>
          
            <div className="PrintAge">
              {/*afisati varsta si daca are peste 18 ani*/}
                <Age selectedDate={selectedDate1}/>
            </div>
          
            <div className="btnStyle">
              <button onClick={ChangeLocal}>{locale==="ro" ? 'Schimba calendarul in engleza' : 'Schimba calendarul in romana'}</button>
            </div>
            <div className="btnStyle">
              <button onClick={UnixTimeStampFunc}>Detalii data</button>
            </div>
              <div> {ok && <div> <p>Data selectata transformata in utc: {dataUTC}</p> 
                                <p>Data selectata afista in unix timestamp: {unixtimestamp}</p>
                                <p>Data selectata afista in limba engleza: {dataEngl}</p>
                                <p>Data selectata afista in limba romana: {dataRo}</p></div>}
                
              </div>
          </td>
          <td className="flex-container">
            <div>
              {/*V2*/}
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
                    <input type="number" onChange={getData}/> 
                  </label>
                </form>
                <button onClick={getFeedback}>Submit</button>
                <div>{ okV3? <p>Ati introdus {dayNo} zile</p> : null }</div>

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