import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./actions/currentUser";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [dispatch]);
  return (
    <div className="app">
      <ChakraProvider>
        <Router>
          <AllRoutes />
        </Router>
      </ChakraProvider>
    </div>
  );
}

export default App;
