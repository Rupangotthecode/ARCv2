import {BrowserRouter as Router} from 'react-router-dom';
import AllRoutes from './AllRoutes'
import { ChakraProvider } from '@chakra-ui/react'
import './App.css';



function App() {

  return (
    <div className='app'>
      
        <ChakraProvider>
          <Router>
            <AllRoutes/>
          </Router>
        </ChakraProvider>
      
    </div>
  );
}

export default App;
