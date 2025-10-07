import React, { useEffect, useRef } from 'react'
import { useState, useCallback } from 'react'

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
    // useRef Hook
  const passwordRef = useRef(null);  // used for reference(to show copy effect to user)


  let passwordGenerator = useCallback( () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+= "0123456789";
    if(charAllowed) str+= "!@#$%^&*()_+}{)}(";

  for(let i = 1; i<=length; i++){
    let char = Math.floor(Math.random() * str.length + 1);
    pass += str.charAt(char);
  }
  setPassword(pass);
  

  }, [length, numberAllowed, charAllowed, setPassword]);// here setPassword is used  for cache (memory) optimization.

  

  const copyPasswordToClipboard = useCallback(() => { 
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,101);
    window.navigator.clipboard.writeText(password)
  }, [password]);



  useEffect( () => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator]);


  return (

    <>

    <div className='w-full max-w-lg mx-auto text-center shadow-md rounded-lg px-4 py-4 my-40 text-orange-500 bg-gray-800'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
         <div className='flex justify-center items-center my-5'>
            <input type='text' placeholder='Password' value={password} className='outline-none w-full py-1 px-3 bg-white text-gray-700 font-bold rounded-lg' readOnly ref={passwordRef} />
            <button  onClick={copyPasswordToClipboard} className=' flex justify-center items-center outline-none rounded-lg bg-gray-950 px-2 py-1 ms-1.5 cursor-pointer'>copy</button>

         </div>
      
      

       
       <div className='flex flex-wrap gap-x-2 text-sm'>

          <div className='flex items-center gap-x-1'>
             <input type='range' min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}}/>
             <label>Length: {length}</label>
           </div>

            <div className='flex items-center gap-x-1'>
             <input type='checkbox' defaultChecked={setNumberAllowed} id='numberInput' onChange={() => { setNumberAllowed((prev) => !prev )}}/>
             <label htmlFor='numberInput'>Numbers</label>
           </div>

            <div className='flex items-center gap-x-1'>
             <input type='checkbox' defaultChecked={setCharAllowed} id='charInput' onChange={() => { setCharAllowed((prev) => !prev )}}/>
             <label htmlFor='charInput'>Characters</label>
           </div>

  </div>
  </div>

    
    </>
       
  )
}

export default App
