import { useEffect, useState } from "react";
import db from "../firebase";


const Form = () => {
  let [name, setName] = useState("");
  let [cost, setCost] = useState("");

  let handleSubmit = (e) => {
    e.preventDefault();
    if (
      document.getElementById("itemInput").value &&
      document.getElementById("costInput").value
    ) {
      setName(document.getElementById("itemInput").value);
      setCost(parseInt(document.getElementById("costInput").value, 10));
    } else {
      alert("Please Enter Details");
    }
  };

  useEffect(() => {
    if (!(name && cost)) return;
    // console.log(name, cost);
    let item = {
      name,
      cost,
    };

    db.collection("investments")
      .add(item)
      .then((res) => {
        // console.log(res);
        document.getElementById("itemInput").value = "";
        document.getElementById("costInput").value = "";
      });
  }, [name, cost]);

  return (
    <>
      <form>
        <input type="text" placeholder="ENTER ITEM" id="itemInput"></input>
        <input type="text" placeholder="ENTER COST (₹)" id="costInput"></input>

        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Add item
        </button>
      </form>
    </>
  );
};

export default Form;
