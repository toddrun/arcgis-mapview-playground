import React, { useRef } from 'react';

interface Props {
  setOneAndTwoRequest: (oneAndTwoRequest: number) => void;
  setClearRequest: (clearRequest: number) => void;
  setTwoAndOneRequest: (TwoAndOneRequest: number) => void;
  setOneRequest: (oneRequest: number) => void;
  setTwoRequest: (twoRequest: number) => void;
  setComboRequest: (comboRequest: number) => void;
}

const Sidebar: React.FC<Props> = ({
  setOneAndTwoRequest, setTwoAndOneRequest, setOneRequest, setTwoRequest, setClearRequest, setComboRequest 
}) => {

  const explanation = useRef<HTMLDivElement>(null)

  const handleOne = () => {
    setOneRequest(Date.now())

    explanation.current!.innerHTML = 
      'This is the "State Wildlife Action Plan" in a Deck Layer'
  }

  const handleTwo = () => {
    setTwoRequest(Date.now())

    explanation.current!.innerHTML = 
      'This is the "Rockfish" in a Deck Layer'
  }

  const handleOneAndTwo = () => {
    setOneAndTwoRequest(Date.now())

    explanation.current!.innerHTML = 
      '<div>This is the "State Wildlife Action Plan" and "Rockfish" in separate Deck Layers</div><br /><div>You can only see State Wildlife Action Plan</div>'
  }

  const handleTwoAndOne = () => {
    setTwoAndOneRequest(Date.now())

    explanation.current!.innerHTML = 
      '<div>This is the "Rockfish" and "State Wildlife Action Plan" in separate Deck Layers</div><br /><div>You can only see Rockfish</div>'
  }

  const handleCombo = () => {
    setComboRequest(Date.now())
  
    explanation.current!.innerHTML = 
      '<div>This is the "Rockfish" and "State Wildlife Action Plan" in a single Deck Layer</div><br /><div>You can see both!</div>'
  }

  const handleClear = () => {
    setClearRequest(Date.now())

    explanation.current!.innerHTML = ''
  }

  return (
    <div className="sidebar">
      <button onClick={() => handleOne()}>One</button>
      <button onClick={() => handleTwo()}>Two</button>
      <button onClick={() => handleOneAndTwo()}>One and Two</button>
      <button onClick={() => handleTwoAndOne()}>Two and One</button>
      <button onClick={() => handleCombo()}>Combo</button>
      <button onClick={() => handleClear()}>Clear</button>
      <hr />

      <div id="explain-it" ref={explanation}></div>
    </div>
  )
}
  


export default Sidebar;
