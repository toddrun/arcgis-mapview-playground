// @ts-nocheck
import { useState } from "react";
import MainView from "./main-view";
import Sidebar from "./sidebar";

function App() {
  const [oneAndTwoRequest, setOneAndTwoRequest] = useState<number>(Date.now());
  const [clearRequest, setClearRequest] = useState<number>(Date.now());
  const [twoAndOneRequest, setTwoAndOneRequest] = useState<number>(Date.now());
  const [oneRequest, setOneRequest] = useState<number>(Date.now());
  const [twoRequest, setTwoRequest] = useState<number>(Date.now());
  const [comboRequest, setComboRequest] = useState<number>(Date.now());

  return (
    <div className="App">
      <h1>Deck Layer's do not play well together!</h1>
      <div className="content">
        <Sidebar
          setOneAndTwoRequest={setOneAndTwoRequest} 
          setClearRequest={setClearRequest} 
          setTwoAndOneRequest={setTwoAndOneRequest} 
          setOneRequest={setOneRequest}
          setTwoRequest={setTwoRequest}
          setComboRequest={setComboRequest}
        />
        <MainView 
          oneAndTwoRequest={oneAndTwoRequest} 
          clearRequest={clearRequest} 
          twoAndOneRequest={twoAndOneRequest} 
          oneRequest={oneRequest}
          twoRequest={twoRequest}
          comboRequest={comboRequest}
        />
      </div>
    </div>
  );
}

export default App;
