import React from 'react'

const InputLenght = ({valueLenght}) => {
    
    let length = 25-valueLenght;

  return (
    <div className='smallFont1' style={{color: length === 0 ? "#aa3333af" : "#45454570", width: "16px"}}>
            {length}
    </div>
  )
}

export default InputLenght