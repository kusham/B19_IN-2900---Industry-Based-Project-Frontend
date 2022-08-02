import React from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#183d78" : "#308fe8",
  },
}));

function ProgressBar({
  EmpWithProf,
  EmployeeWithAcc,
  user,
  // birthday,
  // streetNo,
  // city,
  // phoneNumber,
}) {
  // let acadamicQual=EmployeeWithAcc[0];

  let count = 0,
    percentage = 0;
  if (EmployeeWithAcc) {
    if (
      EmployeeWithAcc.advancedLevelResults[0] === null ||
      EmployeeWithAcc.advancedLevelResults[0] === " " ||
      EmployeeWithAcc.advancedLevelResults[0] === ""
    ) {
      count++;
    }

    if (
      EmployeeWithAcc.ordinaryLevelResult[0] == null ||
      EmployeeWithAcc.ordinaryLevelResult[0] === " " ||
      EmployeeWithAcc.ordinaryLevelResult[0] === ""
    ) {
      count++;
    }
    if (
      EmployeeWithAcc.achievements[0] === null ||
      EmployeeWithAcc.achievements[0] === " " ||
      EmployeeWithAcc.achievements[0] === ""
    ) {
      count++;
    }
  } else {
    count = 3;
  }
  if (EmpWithProf) {
    if (
      EmpWithProf.language[0] === null ||
      EmpWithProf.language[0] === " " ||
      EmpWithProf.language[0] === ""
    ) {
      count++;
    }
    if (
      EmpWithProf.degree[0] === null ||
      EmpWithProf.degree[0] === " " ||
      EmpWithProf.degree[0] === ""
    ) {
      count++;
    }
    if (
      EmpWithProf.course[0] === null ||
      EmpWithProf.course[0] === " " ||
      EmpWithProf.course[0] === ""
    ) {
      count++;
    }
  } else {
    count += 3;
  }
  if (
    user &&
    (user.phoneNumber === "" ||
      user.phoneNumber === " " ||
      user.phoneNumber === undefined)
  ) {
    count++;
  }
  if (
    user &&
    (user.birthday === "" ||
      user.birthday === " " ||
      user.birthday === undefined)
  ) {
    count++;
  }
  if (
    user &&
    (user.city === "" || user.city === " " || user.city === undefined) &&
    (user.streetNo === "" ||
      user.streetNo === " " ||
      user.streetNo === undefined)
  ) {
    count++;
  }
  if (
    user &&
    (user.profilePic === "" ||
      user.profilePic === " " ||
      user.profilePic === undefined)
  ) {
    count++;
  }

  
  switch (count) {
    case 0: {
      percentage = 100;
      break;
    }
    case 1: {
      percentage = 90;
      break;
    }
    case 2: {
      percentage = 80;
      break;
    }
    case 3: {
      percentage = 70;
      break;
    }
    case 4: {
      percentage = 60;
      break;
    }
    case 5: {
      percentage = 50;
      break;
    }
    case 6: {
      percentage = 40;
      break;
    }
    case 7: {
      percentage = 30;
      break;
    }
    case 8: {
      percentage = 20;
      break;
    }
    case 9: {
      percentage = 10;
      break;
    }
    default: {
      percentage = 0;
    }
  }
  return (
    <div>
      <BorderLinearProgress
        variant="determinate"
        value={percentage}
        sx={{ mb: 2, mt: 3 }}
      />
    </div>
  );
}

export default ProgressBar;
