
import './App.css';

import NavigationLayout from "./components/Common/Navigation";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Common/Footer";


function App() {
  return (
    <AuthProvider>
      <div className="App">
        <NavigationLayout />
      </div>
      <Footer/>
    </AuthProvider>
  );
}

export default App;
