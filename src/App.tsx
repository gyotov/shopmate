import Dashboard from "@components/Dashboard";
import { AppContextProvider } from "@context/context";

function App() {
  return (
    <AppContextProvider>
      <div className="app">
        <Dashboard />
      </div>
    </AppContextProvider>
  );
}

export default App;
