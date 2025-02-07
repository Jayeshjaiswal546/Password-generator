import logo from './logo.svg';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { upperCaseSymbols, lowerCaseSymbols, numSymbols, specialSymbols } from './Data/PasswordChar';
function App() {

  let notifyGenerate = ()=>{
    toast.success('Password generated successfully !!')
  }
  let notifyCopy = ()=>{
    toast.info('Password copied to clipboard !!')
  }
  let notifyError = (err) =>{
    toast.error(err);
  }

  let [lengthInput, setLengthInput] = useState('');
  let [isUpperCaseSymbols, setUpperCaseSymbols] = useState(false);
  let [isLowerCaseSymbols, setLowerCaseSymbols] = useState(false);
  let [isNumberSymbols, setIsNumberSymbols] = useState(false);
  let [isSpecialSymbols, setIsSpecialSymbols] = useState(false);

  // let checkboxArray = [{upperCase:{isUpperCaseSymbols}},{lowerCase:{isLowerCaseSymbols}},{numberCase:{isNumberSymbols}},{specialCase:{isSpecialSymbols}}]

  let checkboxArray = {isUpperCaseSymbols, isLowerCaseSymbols, isNumberSymbols, isSpecialSymbols};
  // let filteredCheckBoxArray = Object.entries(checkboxArray).filter((key,value)=>value==true)
  let filteredCheckBoxArray = Object.entries(checkboxArray);
  let secondFilter = filteredCheckBoxArray.filter((value, index)=>value[1]===true)
  let finalArray = secondFilter.map((value, index)=>value[0])

  function getRandom(str){
    // console.log(str.length);
    let strLength=str.length;
    let randPostn = Math.floor(Math.random()*strLength);
    // console.log(randPostn);
    // console.log(str[randPostn]);
    return str[randPostn];
  }

  let [finalStatePassword, setFinalStatePassword] = useState('');
   
  let finalPassword =''

  let mapObject = {
    isUpperCaseSymbols:upperCaseSymbols, 
    isLowerCaseSymbols:lowerCaseSymbols, 
    isNumberSymbols: numSymbols, 
    isSpecialSymbols: specialSymbols};
  // console.log(mapObject);

  let handleSubmit = (event)=>{
    event.preventDefault();
    finalPassword = '';
    setFinalStatePassword('');
     if(lengthInput==''){
      notifyError('Please enter the length of password');
      return;
     }
     if(!(isUpperCaseSymbols || isLowerCaseSymbols || isNumberSymbols || isSpecialSymbols)){
      notifyError('Please select atleast one checkbox');
      return;
     }


    // console.log(lengthInput);
    // console.log(isUpperCaseSymbols);
    // console.log(isLowerCaseSymbols);
    // console.log(isNumberSymbols);
    // console.log(isSpecialSymbols);
    // console.log(checkboxArray);
    // console.log(filteredCheckBoxArray);
    // console.log(secondFilter);
    // console.log(finalArray);
    // console.log(Object.fromEntries(filteredCheckBoxArray));

    for(let i=0; i<lengthInput; i++){
      // console.log(i);
      // console.log(finalArray.length);
      let findFunctionPosition =Math.floor(Math.random()*finalArray.length); 
      // console.log(finalArray[findFunctionPosition]);
      let finalFunction = finalArray[findFunctionPosition];
      // console.log(finalFunction);
      // console.log(mapObject[finalFunction]);
      let charString  = mapObject[finalFunction];
      // console.log(charString);

      let randChar = getRandom(charString);
      finalPassword += randChar;
      // setFinalPassword(finalPassword+randChar);
      // console.log(randChar);
      // console.log(finalPassword);
    }
    setFinalStatePassword(finalPassword);
    // console.log(finalStatePassword);
    notifyGenerate();

  }

  let handleCopy = (event)=>{
      event.preventDefault();
      navigator.clipboard.writeText(finalStatePassword);
      notifyCopy();
  }


  return (
    <div className="App bg-violet-300 h-screen p-[50px]">
    <ToastContainer/>
      <div className='mx-auto w-[350px] h-auto text-white pt-[20px]' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <h1 className='font-bold text-[28px]'>Password Generator</h1>
        <form className='text-start p-[20px]'>
          <div className='flex justify-between items-center m-[10px]'>
            <label>Enter the Length of Password</label><input className='text-right w-[60px] h-[20px] text-black p-[5px]' onChange={(e)=>{setLengthInput(e.target.value)}} value={lengthInput} style={{ outline: 'none' }} />
          </div>
          <div className='flex justify-between items-center m-[10px]'>
            <label>Include uppercase letters</label><input type='checkbox' checked={isUpperCaseSymbols} onChange={(e)=>{setUpperCaseSymbols(e.target.checked)}} className='w-[20px] h-[20px]' />
          </div>
          <div className='flex justify-between items-center m-[10px]'>
            <label>Include lowercase letters</label><input type='checkbox' checked={isLowerCaseSymbols} onChange={(e)=>{setLowerCaseSymbols(e.target.checked)}} className='w-[20px] h-[20px]' />
          </div>
          <div className='flex justify-between items-center m-[10px]'>
            <label>Include numbers</label><input type='checkbox' checked={isNumberSymbols} onChange={(e)=>{setIsNumberSymbols(e.target.checked)}} className='w-[20px] h-[20px]' />
          </div>
          <div className='flex justify-between items-center m-[10px]'>
            <label>Include speical characters</label><input type='checkbox' checked={isSpecialSymbols} onChange={(e)=>{setIsSpecialSymbols(e.target.checked)}} className='w-[20px] h-[20px]' />
          </div>
          <button onClick={handleSubmit} className='bg-violet-500 w-full h-[50px] text-[24px] my-[20px]'>Generate Password</button>
          <div className='h-[50px] flex justify-between items-center p-[5px]' style={{backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
            <input className=' h-[30px] text-[20px] p-[5px] bg-transparent flex-grow' value={finalStatePassword} style={{outline:'none'}} type='text' readOnly/>
            <button onClick={handleCopy} className='h-[40px] w-[40px] bg-violet-500'><FontAwesomeIcon icon={faCopy} className='text-[25px]'/></button>
          </div>
        </form>
        {/* <button onClick={notifyGenerate}>Click</button>
        <button onClick={notifyCopy}>copy</button> */}





      </div>

    </div>
  );
}
export default App;
