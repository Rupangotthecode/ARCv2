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
  VStack,
  HStack,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { signup } from "../../actions/auth";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";
import { useDisclosure } from "@chakra-ui/react";
import SignupStatusbar from "../../components/Auth/SignupStatusbar";
import black_cat_anim from "../../assets/auth/black_cat.json";
import QuestionTab from "../../components/Auth/QuestionTab";
import ErrorModalAuth from "../../components/ErrorControl/ErrorModalAuth";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [statusIndex, setStatusIndex] = useState(0);
  const [error, setError] = useState(null);
  const handlesignup = () => {
    navigate("/");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      dob: "",
      gender: "",
      loginID: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Please enter child's Name."),

      dob: Yup.date().required("Required"),

      gender: Yup.string().required("Please enter child's Gender."),

      loginID: Yup.string().required("Please enter a suitable  username."),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(signup(values, navigate));
        setStatusIndex(1);
      } catch (error) {
        console.log("error caught", error);
        setError({ message: error.message, header: error.heading });
        onOpen();
      }
    },
  });

  const steps = [
    { title: "First", description: "Basic Info" },
    { title: "Second", description: "Parents' section" },
  ];

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
    <div className="signup-main-container">
      <div className="signup-central-container">
        <ErrorModalAuth
          isOpen={isOpen}
          onClose={onClose}
          errorBody={error?.message}
          errorHeader={error?.header}
        />
        <div className="signup-top-container">
          <SignupStatusbar steps={steps} index={statusIndex} />
        </div>
        <div className="signup-bottom-container">
          {statusIndex === 0 && (
            <div className="signup-info-container">
              <VStack color="#490086" alignItems="center">
                <Heading size="2xl" pb="5%">
                  வரவேற்பு
                </Heading>
                <Heading size="md" lineHeight="140%" fontWeight="medium">
                  காது கேளாத குழந்தைகளுக்கு செவித்திறனைக் கண்டறிதல் மற்றும்
                  செவிவழிப் வேறுபாடு ஆகியவற்றைப் பயிற்றுவிப்பதற்கான தமிழ்
                  மொழியில் ஒரு பொருள் மற்றும் துணை தயாரிப்பாக பெற்றோர் பயிற்சி
                  கையேடு. இது NewGen IEDC SRM இன் நிதியுதவியின் கீழ்
                  உருவாக்கப்பட்டது மற்றும் நெறிமுறை எண்ணுடன் பதிவு
                  செய்யப்பட்டுள்ளது.
                </Heading>
              </VStack>
            </div>
          )}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="signup-login-container"
            style={
              statusIndex === 0
                ? { width: "35%" }
                : { width: "70%", height: "100%" }
            }
          >
            <VStack color="#490086" alignItems="center">
              <Heading as="h1" id="signup-section">
                Sign Up
              </Heading>
              {statusIndex === 0 ? (
                <Box p={5} rounded="md" w="100%">
                  <form onSubmit={formik.handleSubmit}>
                    <VStack spacing={4}>
                      <FormControl
                        isInvalid={!!formik.errors.name & formik.touched.name}
                      >
                        <FormLabel htmlFor="name">Child's Name</FormLabel>
                        <Input
                          borderColor="#9452f7"
                          id="name"
                          name="name"
                          type="string"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.name}
                        />
                        <FormErrorMessage>
                          {formik.errors.name}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={
                          !!formik.errors.loginID & formik.touched.loginID
                        }
                      >
                        <FormLabel htmlFor="loginID">
                          Child's Username
                        </FormLabel>
                        <Input
                          borderColor="#9452f7"
                          id="loginID"
                          name="loginID"
                          type="string"
                          placeholder="School ID/Roll Number or other unique ID"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.loginID}
                        />
                        <FormErrorMessage>
                          {formik.errors.loginID}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={!!formik.errors.dob & formik.touched.dob}
                      >
                        <FormLabel htmlFor="dob">
                          Child's Date Of Birth
                        </FormLabel>
                        <Input
                          borderColor="#9452f7"
                          id="dob"
                          name="dob"
                          type="date"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.dob}
                        />
                        <FormErrorMessage>{formik.errors.dob}</FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={
                          !!formik.errors.gender & formik.touched.gender
                        }
                      >
                        <FormLabel htmlFor="gender">Child's Gender</FormLabel>
                        <RadioGroup
                          id="gender"
                          name="gender"
                          borderColor="#9452f7"
                          onChange={(value) =>
                            formik.setFieldValue("gender", value)
                          }
                          onBlur={formik.handleBlur}
                          value={formik.values.gender}
                        >
                          <Stack direction="row" spacing="18px">
                            <Radio value="male" colorScheme="purple">
                              Male
                            </Radio>
                            <Radio value="female" colorScheme="purple">
                              Female
                            </Radio>
                            <Radio
                              value="NA"
                              colorScheme="purple"
                              textColor="purple"
                            >
                              Others/Prefer Not to say
                            </Radio>
                          </Stack>
                        </RadioGroup>
                        <FormErrorMessage>
                          {formik.errors.gender}
                        </FormErrorMessage>
                      </FormControl>

                      <Button type="submit" colorScheme="purple" width="full">
                        உங்கள் கணக்கை துவங்குங்கள்
                      </Button>
                      <HStack className="switcher">
                        <div className="switchtext">
                          <Heading size="md">Already have an account?</Heading>
                        </div>
                        <Button
                          onClick={handlesignup}
                          className="switch-btn"
                          colorScheme="purple"
                          variant="outline"
                        >
                          Log in
                        </Button>
                      </HStack>
                    </VStack>
                  </form>
                </Box>
              ) : (
                <QuestionTab />
              )}
            </VStack>
          </motion.div>
        </div>
        <Player
          autoplay
          loop
          speed={0.3}
          src={black_cat_anim}
          style={{ height: "230px", width: "230px" }}
          className="signup-green-face"
        >
          <Controls visible={false} />
        </Player>
      </div>
    </div>
  );
};

export default Signup;
