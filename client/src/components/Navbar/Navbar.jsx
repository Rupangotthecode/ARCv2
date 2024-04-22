import React from "react";
import { Button, Heading, Image } from "@chakra-ui/react";
import avatar from "../../assets/avatars/avatar3.png";
import { useDispatch } from "react-redux";
import "./Navbar.css";
import BackButton from "./Backbutton";
import ReloadButton from "./Reloadbutton";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/auth";

const Navbar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="navbar-main-container">
      <div className="navbar-left-container">
        <div className="navbar-util-buttons">
          <BackButton color={props.button} />
          <ReloadButton color={props.button} />
        </div>
        <Heading size="xl" color={props.heading}>
          செவித்திறன்{" "}
        </Heading>
      </div>
      <div className="navbar-right-container">
        <div className="navbar-avatar-container">
          <Image
            src={avatar}
            alt="avatar"
            height="8vh"
            onClick={() => navigate("/profile")}
          />
        </div>
        <div className="navbar-logout-container">
          <Button
            variant="solid"
            colorScheme={props.button}
            onClick={() => dispatch(logout(navigate))}
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
