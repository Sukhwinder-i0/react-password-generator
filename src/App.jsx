import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8)   ;
  const [isNum, setIsNum] = useState(false)
  const [isChar, setIsChar] = useState(false) 
  const [password, setPassword] = useState("")

  // useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIZKLMNOPQERSTUVWZYZabcdefijklmnopqrstuvwxyz"

    if(isNum) str += "0123456789"
    if(isChar) str += "!@#$%^&*()-_~`+=[]{}"

    for(let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, isNum, isChar, setPassword])   // Dependencies and possible run, how to optimise that method method // Keep yhem in Cache


  const copyPassToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999)
    window.navigator.clipboard.writeText(password)
    
  },[password])


  useEffect(() => {
    passwordGenerator()
  }, [length, isNum, isChar, passwordGenerator])  // whichever is changed run the method again
  

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-36 text-orange-500 bg-gray-700'
    >
    <h1 className='text-white text-center p-4'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          type='text'
          value={password}
          className='outline-none w-full py-2 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
        />
        <button id='copyBtn'
        onClick={copyPassToClipboard}
        className='bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range" 
          min={6}
          max={100}
          value={length}
          className=' cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label>length: {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={isNum}
            id="numberInput"
            onChange={() => {
              setIsNum((prev) => !prev)
            }}
          />
          <label htmlFor='numberInput'>Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={isChar}
            id="characterInput"
            onChange={() => {
              setIsChar((prev) => !prev)
            }}
          />
          <label htmlFor='characterInput'>Characters</label>
        </div>


      </div>
    </div>
    </>
  )
}

export default App
