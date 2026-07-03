import React from 'react'

const GlobalButton = ({text, outlined, onClick}) => {
  return (
    <button onClick={onClick} className={`px-5 py-2 hover:scale-[1.1] transition-all duration-500  rounded-3xl font-primary cursor-pointer ${outlined?"bg-transparent border border-[#110111] text-[#110111] hover:bg-[#110111] hover:text-white":"bg-[#110111] text-white"} `}>{text}</button>
  )
}

export default GlobalButton