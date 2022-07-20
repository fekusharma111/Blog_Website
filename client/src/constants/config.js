// API NOTIFICATION MESSAGES will be kept in this file
export const API_NOTIFICATION_MESSAGES = {
  //if you have loder then
  loading: {
    title: "Loading...",
    message: "Data is being loaded, Please Wait... ",
  },
  success: {
    title: "Success",
    message: "Data successfully loaded",
  },
  responseFailure: {
    title: "Error",
    message:
      "Error occured while fetching response from the server. Please try again",
  },
  requestFailure: {
    title: "Error",
    message: "Error occured while parsing request data",
  },
  networkError: {
    title: "Error",
    message:
      "Unable to connect to the server. Please check your internet connectivity and try again later",
  },
};
//api service call

// SAMPLE REQUEST
// NEED SERVICE CALL:{URL:'/', METHOD:"POST/GET/PUT/DELETE", PARAMS:TRUE/FALSE, QUERY:TRUE/FALSE}

export const SERVICE_URLs = {
  userSignup: { url: "/signup", method: "POST" },
  userlogin: { url: "/login", method: "POST" },
};
