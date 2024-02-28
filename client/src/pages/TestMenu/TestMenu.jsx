import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { motion } from 'framer-motion';
import "./TestMenu.css"

//fetch all assets for the test here and pass it down the props 

const TestMenu = (props) => {

  const navigate = useNavigate()

  return (
    <div className='testmenu-main-container'>
      <Navbar heading="teal" button="teal"/>
      <div className="testmenu-content-container">
        <div className="testmenu-heading-container">
          <Heading fontSize='3vw' color="teal">{props.currentTest}</Heading>
        </div>
        <div className="testmenu-options-container">
          {props.options.map((option, index)=>
            <motion.div 
              className='testmenu-option' 
              key = {index} 
              onClick={()=>navigate(option.path)}
              initial={{ boxShadow: 0, scale: 0.9 }}
              animate={{ boxShadow: "0px 0px 3px 4px rgb(255, 255, 255), 0px 0px 6px 5px rgba(61, 61, 61, 0.623)", scale: 1 }}
              transition={{ duration: 1.5, 
                type: 'spring', 
                stiffness: 120, 
                damping: 5,
              }}
            >
              <Player
                    autoplay
                    loop
                    src= {option.ani}
                    style={{ height: '150px', width: '150px' }}
                    className="testmenu-option-animation"
                    >
                        <Controls visible={false} />
              </Player>
              <Heading fontSize='1.8vw' color="teal" textAlign='center'>{option.text}</Heading>              
            </motion.div>
          )}
        </div>
      </div>
      
    </div>
  )
}

export default TestMenu
