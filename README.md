# Aural Rehabilitation for Children in Tamil

_Funded by EPICS in IEEE_

## Overview

The **Auditory Therapy Kiosk App** is designed to provide auditory therapy for hearing and speech-impaired children who use hearing aids. The app aims to improve children's auditory perception and discrimination skills through structured exercises presented in a kiosk environment. 

The software uses the **MERN stack** (MongoDB, Express.js, React, Node.js) and is implemented in a kiosk module to provide a focused and engaging experience for children.

## Features

The app includes two types of auditory tests, each with multiple levels to challenge the child's auditory processing abilities:

1. **Auditory Awareness Test**:
   - Focuses on developing a child's awareness of various sounds.
   - Subparts:
     - **Environmental Sounds**: Sounds commonly heard in everyday settings, like animal noises, vehicle sounds, etc.
     - **Music**: Different types of music or musical instruments.
     - **Speech**: Varied speech sounds, including vowels, consonants, and common phrases.
   
2. **Auditory Discrimination Test**:
   - Focuses on enhancing a child's ability to differentiate between different sounds.
   - Subparts:
     - **Environmental Sounds**: Discrimination between similar and different environmental sounds.
     - **Speech**: Differentiating between various speech sounds and words.

### Test Levels

Each subpart of the tests is designed with four levels of difficulty:

1. **Sounds with Image**: 
   - The child hears a sound and matches it with an image on the screen. This level provides a visual cue to assist in sound recognition.
   
2. **Sounds without Image**:
   - The child hears a sound without any visual aids and is required to identify or differentiate the sound.

3. **Sounds from a Farther Distance**:
   - Sounds are presented as if they are coming from a distance, to simulate real-world auditory scenarios.

4. **Sounds with Background Noise**:
   - The child hears sounds embedded in background noise, helping them learn to focus on specific sounds in noisy environments.

## Data Management

- The app stores test data separately for each child, allowing for personalized progress tracking.
- Data collected from each test session includes information on:
  - Test type and subpart
  - Level of difficulty
  - Responses and response times
  - Number of correct and incorrect answers

- The stored data can be analyzed to gain insights into the child's perception abilities, helping educators and therapists adjust the therapy program according to individual needs.

## Analysis Features

The app offers several data analysis features to help understand a child's auditory perception:

- **Performance Analysis**: Tracks the child’s performance over time, providing insights into improvements or areas needing further attention.
- **Response Pattern Identification**: Analyzes patterns in the child’s responses, such as consistent errors or preferences for certain sound types.
- **Progress Reports**: Generates reports that summarize a child’s performance across different tests and levels.
- **Customization for Therapy**: Allows for the customization of test parameters based on the child's progress, to optimize the therapy experience.

## Technology Stack

The app is built using the **MERN Stack**:

- **MongoDB**: Stores user data and test results, enabling efficient data retrieval and analysis.
- **Express.js**: Handles the backend server and API requests.
- **React**: Provides a dynamic and interactive user interface for the kiosk module.
- **Node.js**: Manages server-side logic and processes.

_Project Video_
https://www.youtube.com/watch?v=08Iw2y3Dr2k&t=181s
