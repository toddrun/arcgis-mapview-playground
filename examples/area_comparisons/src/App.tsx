import { useState } from "react";
import MainView from "./main-view";
import Sidebar from "./sidebar";

function App() {
  const [geojson, setGeojson] = useState(null);

  return (
    <div className="App">
      <h1>Let's see what's available without being logged in!</h1>
      <div className="content">
        <Sidebar geojson={geojson} setGeojson={setGeojson} />
        <MainView geojson={geojson} />
      </div>
    </div>
  );
}

export default App;
