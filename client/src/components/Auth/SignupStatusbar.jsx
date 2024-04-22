import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Box
  } from '@chakra-ui/react'

const SignupStatusbar = (props) =>{
    const { activeStep } = useSteps({
      index: 0,
      count: props.steps.length,
    })
    console.log(props.index)
    return (
      <Stepper size='lg' colorScheme='red' index={props.index} width="50%" backgroundColor= "rgb(255, 255, 255)" borderRadius= "50px" boxShadow= "0px 0px 3px 4px rgb(255, 255, 255), 0px 0px 6px 5px rgba(61, 61, 61, 0.623)" pl = "2%" pr="2%">
        {props.steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
  
            <Box flexShrink='0'>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>
  
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    )
  }

export default SignupStatusbar