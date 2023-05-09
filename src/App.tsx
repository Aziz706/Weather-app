import { Routes, Route } from "react-router-dom";
import Page1 from "./Components/Page1/Page1";
import Page2 from "./Components/Page2/Page2";
import Page2id from "./Components/Page2/Page2id";

const api = {
  key: "adb3e547b13e79746fac1a5d9c5ca410",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
 
  return (
    <div>
      <div>
      <div style={{width: "100%", height: "100%"}} >
        <Routes>
        <Route path='/' element={<Page1 api={api} />} />
        <Route path='/page-1' element={<Page1 api={api} />} />
        <Route path='/page-2' element={<Page2 api={api} />} />
        <Route path='/page-2/:id' element={<Page2id api={api} />} />
      </Routes>
      </div>
      
      
    </div>
    </div>
    
  );
}

export default App;
