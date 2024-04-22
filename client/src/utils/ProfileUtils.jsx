export const countExamsByDate = (exams) => {
  // Create an empty object to store counts for each date
  var counts = {};
  // Iterate over each exam
  exams.forEach((exam) => {
    // Extract the date from the exam object
    var date = exam.date.split(" ")[0]; // Assuming date is in the format "YYYY-MM-DD"

    // If the date is already in the counts object, increment its count
    if (counts[date]) {
      counts[date]++;
    } else {
      // If the date is not yet in the counts object, initialize its count to 1
      counts[date] = 1;
    }
  });

  // Convert the counts object into an array of objects
  var result = Object.keys(counts).map((date) => {
    return { date: date, value: counts[date] };
  });

  return result;
};

export const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};
