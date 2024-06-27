export const manageUnlocks = (user, testCode, testLevel) => {
  const currentUnlock = user.unlocks[testCode];
  if (currentUnlock === 4) {
    if (testCode.includes("A")) {
      switch (testCode) {
        case "A_1":
          user.unlocks["A_2"] = 1;
          break;
        case "A_2":
          user.unlocks["B_1"] = 1;
          break;
        default:
          break;
      }
    } else if (testCode.includes("B")) {
      switch (testCode) {
        case "B_1":
          user.unlocks["B_2"] = 1;
          break;
        case "B_2":
          user.unlocks["B_3"] = 1;
          break;
        case "B_3":
          user.unlocks["B_3"] = 1;
          break;
        default:
          break;
      }
    }
  } else {
    user.unlocks[testCode] = testLevel + 1;
  }

  return user;
};
