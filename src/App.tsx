import { Routes, Route, Link } from "react-router-dom";
import './App.css'
import { Views } from "./routes";

function App() {

  return (
    <div className="App">
      <Routes>
        {Views.map((view) => {
          const { type, name, component } = view;
          const key = `${type}/${name}`
          return <Route path={key} key={key} element={component()} />;
        })}
        <Route path="/" element={<div>home</div>} />
        <Route path="about" element={<div>about</div>} />
      </Routes>
    </div>
  )
}

export default App
