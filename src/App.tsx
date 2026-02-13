import "./App.scss";
import FloatingButton from "./components/FloatingButton";

function App() {
  return (
    <div className="app">
      <div className="page-content">
        <h1>Batmaid</h1>
        <p>Scroll down to see the floating button</p>
      </div>
      <FloatingButton />
    </div>
  );
}

export default App;
