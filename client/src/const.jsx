import environ from "./assets/TestA/environment.json";
import music from "./assets/TestA/music.json";
import speech from "./assets/TestA/speech.json";
import communication from "./assets/TestB/communication.json";

export const TestAOptions = [
  {
    text: "சுற்றுச்சூழல் ஒலிகள்",
    path: "/TestA/envsounds/TLM",
    parameter: "A_1",
    ani: environ,
  },
  {
    text: "இசை",
    path: "/TestA/music/TLM",
    parameter: "A_2",
    ani: music,
  },
];

export const TestBOptions = [
  {
    text: "ஒலிகலின் வேறுபாட்டை அறிக",
    path: "/TestB/diffsounds/TLM",
    parameter: "B_1",
    ani: environ,
  },
  {
    text: "தமிழ் சத்தங்களை அறிக",
    path: "/TestB/speech/TLM",
    parameter: "B_2",
    ani: speech,
  },
  {
    text: "சொல்லின் தொடர்பு நோக்கத்தின் வேறுபாடு",
    path: "/TestB/communication/TLM",
    parameter: "B_3",
    ani: communication,
  },
];

export const authQuestions = [
  "உங்கள் குழந்தை புதியவர்களை சந்திக்கும் பொழுது கேட்கும் பிரச்சனை சங்கடத்தை ஏற்படுதிகிரதா?",
  "உங்கள் குழந்தை குடும்ப உறுப்பினர்களுடன் பேசும் பொழுது கேட்கும் பிரச்சனை விரக்தியை ஏற்படுத்துமா?",
  "உங்கள் குழந்தைக்கு சக ஊழியர்கள், வாடிக்கையாளர்கள்/ வாடிக்கையாளர்கள் அல்லது காத்திருப்பு பணியாளர்கள் கேட்பதில்/புரிந்து கொள்வதில் சிரமம் உள்ளதா?",
  "செவித்திறன் பிரச்சனை மூலம் உங்கள் குழந்தை குறிப்பிடத்தக்க அளவில் பின்தங்கியதாக உணர்கிறாரா?",
  "கேட்கும் பிரச்சனை உங்கள் குழந்தைக்கு நண்பர்கள், உறவினர்கள் அல்லது அண்டை வீட்டார் வருகை தரும் போது சிரமத்தை ஏற்படுத்துமா?",
  "காது கேளாமை உங்கள் குழந்தைக்கு திரைப்படங்கள் அல்லது திரையரங்கில் காது கேட்கும் பிரச்சனையை ஏற்படுத்துமா?",
  "காது கேளாமை உங்கள் குழந்தைக்கு குடும்ப உறுப்பினர்களுடன் வாக்குவாதத்தை ஏற்படுத்துமா?",
  "காது கேளாமை உங்கள் குழந்தைக்கு டிவி அல்லது வானொலியில் கேட்கும் போது சிரமத்தை ஏற்படுத்துமா?",
  "உங்கள் குழந்தை தனது கேட்கும் வரம்பில் ஏதேனும் சிரமம் இருப்பதாக உணர்கிறார்களா அல்லது அவர்களின் தனிப்பட்ட அல்லது சமூக வாழ்க்கை தடைபடுகிறதா?",
  "காது கேளாமை உங்கள் குழந்தைக்கு உறவினர்கள் அல்லது நண்பர்களுடன் உணவகத்தில் இருக்கும் பொழுது சிரமத்தை ஏற்படுத்துமா?",
];

export const testARules = `வரவேற்பு!

இந்த சோதனை உங்களுக்கு செவிப்புலன் விழிப்புணர்வை ஏற்படுத்த உதவும்.
ஒவ்வொரு கேள்விக்கும் 3 சோதனைகள் இருக்கும்.

ஒவ்வொரு சோதனையிலும் நீங்கள் ஒலியைக் கேட்க முடியுமா இல்லையா என்பதைத் தேர்ந்தெடுக்கும்படி கேட்கப்படுவீர்கள்.
உங்களால் முடிந்தால் "ஆம்" பட்டனையும், முடியாவிட்டால் "இல்லை" பட்டனையும் அழுத்தவும்.
4 நிலைகள் உள்ளன:

நிலை 1: காட்சிக் குறியுடன்
நிலை 2: காட்சி குறிப்பு இல்லாமல்
நிலை 3: தொலைதூர ஒலிகள்
நிலை 4: பின்னணி இரைச்சலுடன்

ஒவ்வொரு சரியான சோதனை பதிலுக்கும் 1 புள்ளியைப் பெறுவீர்கள். ஒவ்வொரு நிலையிலும் தேர்ச்சி பெற 70% மதிப்பெண் தேவை.`;

export const testBRules = `வரவேற்பு!

செவித்திறன் பாகுபாடு மற்றும் பேசும் திறன்களை வளர்க்க இந்த சோதனை உதவும்.
ஒவ்வொரு கேள்விக்கும் 3 தேர்வுகள் இருக்கும்.

ஒவ்வொரு சோதனையிலும், இரண்டு ஒலிகள் ஒன்றன் பின் ஒன்றாக இயக்கப்படும். ஒலிகள் ஒரே மாதிரியானதா அல்லது வேறுபட்டதா என்பதை நீங்கள் சொல்ல வேண்டும்.
நீங்கள் வித்தியாசமாக இருந்தால் "ஆம்" பட்டனையும், இல்லையெனில் "இல்லை" பட்டனையும் அழுத்தவும்.
3 நிலைகள் உள்ளன:

நிலை 1: காட்சி குறிப்பு இல்லாமல்
நிலை 2: தொலைதூர ஒலிகள்
நிலை 3: பின்னணி இரைச்சலுடன்

ஒவ்வொரு சரியான சோதனை பதிலுக்கும் 1 புள்ளியைப் பெறுவீர்கள். ஒவ்வொரு நிலையிலும் தேர்ச்சி பெற 70% மதிப்பெண்கள் தேவை.`;

export const levelADataES = [
  {
    level: "1",
    description: "காட்சிக் குறியுடன்",
    path: "/TestA/envsounds/Level1",
  },
  {
    level: "2",
    description: "காட்சி குறிப்பு இல்லாமல்",
    path: "/TestA/envsounds/Level2",
  },
  {
    level: "3",
    description: "தொலைதூர ஒலிகள்",
    path: "/TestA/envsounds/Level3",
  },
  {
    level: "4",
    description: "பின்னணி இரைச்சலுடன்",
    path: "/TestA/envsounds/Level4",
  },
];

export const levelADataMU = [
  {
    level: "1",
    description: "காட்சிக் குறியுடன்",
    path: "/TestA/music/Level1",
  },
  {
    level: "2",
    description: "காட்சி குறிப்பு இல்லாமல்",
    path: "/TestA/music/Level2",
  },
  {
    level: "3",
    description: "தொலைதூர ஒலிகள்",
    path: "/TestA/music/Level3",
  },
  {
    level: "4",
    description: "பின்னணி இரைச்சலுடன்",
    path: "/TestA/music/Level4",
  },
];

export const levelADataSP = [
  {
    level: "1",
    description: "காட்சிக் குறியுடன்",
    path: "/TestA/speech/Level1",
  },
  {
    level: "2",
    description: "காட்சி குறிப்பு இல்லாமல்",
    path: "/TestA/speech/Level2",
  },
  {
    level: "3",
    description: "தொலைதூர ஒலிகள்",
    path: "/TestA/speech/Level3",
  },
  {
    level: "4",
    description: "பின்னணி இரைச்சலுடன்",
    path: "/TestA/speech/Level4",
  },
];

export const levelBDataDS = [
  {
    level: "1",
    description: "காட்சி குறிப்பு இல்லாமல்",
    path: "/TestB/diffsounds/Level1",
  },
  {
    level: "2",
    description: "தொலைதூர ஒலிகள்",
    path: "/TestB/diffsounds/Level2",
  },
  {
    level: "3",
    description: "பின்னணி இரைச்சலுடன்",
    path: "/TestB/diffsounds/Level3",
  },
];

export const levelBDataCM = [
  {
    level: "1",
    description: "காட்சி குறிப்பு இல்லாமல்",
    path: "/TestB/communication/Level1",
  },
  {
    level: "2",
    description: "தொலைதூர ஒலிகள்",
    path: "/TestB/communication/Level2",
  },
  {
    level: "3",
    description: "பின்னணி இரைச்சலுடன்",
    path: "/TestB/communication/Level3",
  },
];

export const levelBDataSP = [
  {
    level: "1",
    description: "காட்சி குறிப்பு இல்லாமல்",
    path: "/TestB/speech/Level1",
  },
  {
    level: "2",
    description: "தொலைதூர ஒலிகள்",
    path: "/TestB/speech/Level2",
  },
  {
    level: "3",
    description: "பின்னணி இரைச்சலுடன்",
    path: "/TestB/speech/Level3",
  },
];
