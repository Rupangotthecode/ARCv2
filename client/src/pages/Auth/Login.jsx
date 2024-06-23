import { useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../actions/auth";
import "./Login.css";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";
import green_face_anim from "../../assets/auth/green_face_lottie.json";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import ErrorModalGeneral from "../../components/ErrorControl/ErrorModalGeneral";
import ErrorModalAuth from "../../components/ErrorControl/ErrorModalAuth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const handleClickpass = () => setShow(!show);
  const handlesignup = () => {
    navigate("/Signup");
  };

  const formik = useFormik({
    initialValues: {
      loginID: "",
      password: "",
    },
    validationSchema: Yup.object({
      loginID: Yup.string().required("Required"),

      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(login(values, navigate));
      } catch (error) {
        console.log("error caught", error);
        setError({ message: error.message, header: error.heading });
        onOpen();
      }
    },
  });

  const containerVariants = {
    hidden: { opacity: 1, x: "-100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 20, // Adjust damping for the jerk effect
        stiffness: 900, // Adjust stiffness for the jerk effect
      },
    },
  };

  return (
    <div className="auth-main-container">
      <div className="auth-central-container">
        <ErrorModalAuth
          isOpen={isOpen}
          onClose={onClose}
          errorBody={error?.message}
          errorHeader={error?.header}
        />
        <div className="auth-info-container">
          <VStack color="#490086" alignItems="center">
            <Heading size="2xl" pb="5%">
              வரவேற்பு
            </Heading>
            <Heading size="md" lineHeight="140%" fontWeight="medium">
              காது கேளாத குழந்தைகளுக்கு செவித்திறனைக் கண்டறிதல் மற்றும்
              செவிவழிப் வேறுபாடு ஆகியவற்றைப் பயிற்றுவிப்பதற்கான தமிழ் மொழியில்
              ஒரு பொருள் மற்றும் துணை தயாரிப்பாக பெற்றோர் பயிற்சி கையேடு. இது
              NewGen IEDC SRM இன் நிதியுதவியின் கீழ் உருவாக்கப்பட்டது மற்றும்
              நெறிமுறை எண்ணுடன் பதிவு செய்யப்பட்டுள்ளது.
            </Heading>
          </VStack>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="auth-login-container"
        >
          <VStack color="#490086" alignItems="center">
            <Heading as="h1" id="auth-section">
              Log In
            </Heading>
            <Box p={5} rounded="md" w="100%">
              <form onSubmit={formik.handleSubmit}>
                <VStack spacing={4}>
                  <FormControl
                    isInvalid={!!formik.errors.loginID & formik.touched.loginID}
                  >
                    <FormLabel htmlFor="loginID">Username</FormLabel>
                    <Input
                      borderColor="#9452f7"
                      id="loginID"
                      name="loginID"
                      type="string"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.loginID}
                    />
                    <FormErrorMessage>{formik.errors.loginID}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      !!formik.errors.password & formik.touched.password
                    }
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup size="md">
                      <Input
                        id="password"
                        name="password"
                        borderColor="#9452f7"
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClickpass}>
                          {show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {formik.errors.password}
                    </FormErrorMessage>
                  </FormControl>
                  <Button type="submit" colorScheme="purple" width="full">
                    Log in
                  </Button>
                  <HStack className="switcher">
                    <div className="switchtext">
                      <Heading size="md">Don't have an account?</Heading>
                    </div>
                    <Button
                      onClick={handlesignup}
                      className="switch-btn"
                      colorScheme="purple"
                      variant="outline"
                    >
                      Sign Up
                    </Button>
                  </HStack>
                </VStack>
              </form>
            </Box>
          </VStack>
        </motion.div>
      </div>
      <Player
        autoplay
        loop
        src={green_face_anim}
        style={{ height: "120px", width: "120px" }}
        className="auth-green-face"
      >
        <Controls visible={false} />
      </Player>
    </div>
  );
};

export default Login;
