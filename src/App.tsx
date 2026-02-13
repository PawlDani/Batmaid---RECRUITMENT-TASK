import { lazy, Suspense, useState, useEffect } from "react";
import "./App.scss";

const FloatingButton = lazy(() => import("./components/FloatingButton/FloatingButton"));

function App() {
  const [shouldLoadButton, setShouldLoadButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const threshold = viewportHeight * 0.9;

      if (scrollPosition >= threshold) {
        setShouldLoadButton(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app">
      <div className="page-content">
        <h1>Batmaid</h1>
        <p>Scroll down to see the floating button</p>
      </div>
      {shouldLoadButton && (
        <Suspense fallback={null}>
          <FloatingButton />
        </Suspense>
      )}
    </div>
  );
}

export default App;
