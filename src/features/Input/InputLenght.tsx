import React from 'react'
interface InputLenghtProps {
    valueLenght: number;
    maxLength?: number;
}
const InputLenght = ({valueLenght, maxLength=25}: InputLenghtProps) => {
    
    let length = maxLength-valueLenght;

  return (
    <div className='smallFont1' style={{color: length === 0 ? "#aa3333af" : "#45454570", width: "16px"}}>
            {length}
    </div>
  )
}

export default InputLenght