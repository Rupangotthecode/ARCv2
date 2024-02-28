import React from 'react'
import {Button, Heading, Image} from "@chakra-ui/react"
import avatar from "../../assets/avatars/avatar3.png"
import "./Navbar.css"

const Navbar = (props) => {
  return (
    <div className='navbar-main-container'>
      <div className="navbar-left-container">
        <Heading size='xl' color={props.heading}>செவித்திறன் </Heading>
      </div>
      <div className="navbar-right-container">
        <div className="navbar-avatar-container">
            <Image src={avatar} alt="avatar" height='8vh'/>
        </div>
        <div className="navbar-logout-container">
            <Button variant="solid" colorScheme={props.button}>Log Out</Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
