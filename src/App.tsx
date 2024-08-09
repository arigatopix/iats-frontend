import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function getMessage() {
      const m = await axios.get("https://172.30.200.193/api/products");

      setMessage(m.data);
    }

    getMessage();
  }, []);
  return (
    <>
      <h1>Hello world</h1>
      <p>{message}</p>
    </>
  );
}

export default App;
