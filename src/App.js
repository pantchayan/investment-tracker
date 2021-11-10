import Header from "./Components/Header.js";
import Form from "./Components/Form.js";
import Graph from "./Components/Graph.js";
import Legend from "./Components/Legend.js";
import db from "./firebase";
import { useEffect, useState } from "react";

function App() {
  let [data, setData] = useState(null);

  useEffect(() => {
    db.collection("investments").onSnapshot((snapshot) => {
      let data = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setData(data);
    });
  }, []);

  return (
    <>
      <Header />
      <div className="main">
        <Form />
        <div className="visual">
          {data? <Graph data = {data}/>:<p style={{color:'white'}}>Fetching data...</p>}
          {data? <Legend data = {data}/>:<p style={{color:'white'}}></p>}
        </div>
      </div>
    </>
  );
}

export default App;
