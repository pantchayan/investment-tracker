import Header from "./Components/Header.js";
import Form from "./Components/Form.js";
import Graph from "./Components/Graph.js";
import Legend from "./Components/Legend.js";

import db from "./firebase.js";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    db.collection("investments").onSnapshot((snapshot) => {
      let data = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      console.log(data);
    });
  });

  return (
    <>
      <Header />
      <div className="main">
        <Form />
        <div className="visual">
          <Graph />
          <Legend />
        </div>
      </div>
    </>
  );
}

export default App;
