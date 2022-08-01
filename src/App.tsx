import { Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import './App.css'
import { Views } from "./routes";
import HomeView from "./views/home";

function App() {

  return (
    <div className="App">
      <Routes>
        {Views.map((view) => {
          const { type, name } = view;
          const key = `${type}/${name}`
          return <Route path={key} key={key} element={
            <Suspense fallback={null}>
              <view.component />
            </Suspense>
          } />;
        })}
        <Route path="/" element={HomeView()} />
      </Routes>
    </div>
  )
}

export default App
