export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const monthOptions = monthNames.map((month) => ({
  value: month,
  label: month,
}));

const currentYear = new Date().getFullYear();
export const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

// create user constants info
export const genders = ["Male", "Female", "Other"];
export const gendersOptions = genders.map((gender) => ({
  value: gender.toLowerCase(),
  label: gender,
}));

export const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
export const bloodGroupOptions = bloodGroups.map((bloodGroup) => ({
  value: bloodGroup,
  label: bloodGroup,
}));

export const roles = ["admin", "faculty", "student"];
export const roleOptions = roles.map((role) => ({
  value: role,
  label: role,
}));

export const departments = ["CSE", "EEE", "BBA", "English", "LLB"];
export const departmentOptions = departments.map((department) => ({
  value: department,
  label: department,
}));
