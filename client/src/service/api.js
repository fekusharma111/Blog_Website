import axios from "axios";
import { API_NOTIFICATION_MESSAGES, SERVICE_URLs } from "../constants/config";
// axios Interceptor//
const API_URL = "http://localhost:8000";

//
const axiosInstance = axios.create({
  baseURL: API_URL, // backend url
  timeout: 10000, // if api rejected/stuck/pending then this is the timeout
  headers: {
    "content-type": "application/json", //optional
  },
});

// Calling the  request interceptor.
// it takes two callback funtion with comma(,) seperated.
// 1st one is for success,
// 2nd one is  for error (if error then we promise.reject and then pass the error )
axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//Calling the  response interceptor.
// it takes two callback funtion with comma(,) seperated.
// 1st one is for success,
// 2nd one is  for error (if error then we promise.reject and then pass the error )
axiosInstance.interceptors.response.use(
  function (response) {
    // we should stop the global loader here if present any because the response is came
    //stop global loader here
    return processResponse(response); //a fuction will return in success case with response as a parameter
  },
  function (error) {
    // in error case we also need to stop the global loader if present
    //stop global loader here
    return Promise.reject(processError(error));
  }
);

// in success case we need the process that response.
// ////////////////
// if success --> return { isSuccess:true, data(aactual): object}
// if success then it will the return set isSuccess to true the data as object
//////////////
// if failure -->return {isFailure:true, status:string, msg (msg from backend): string, code(status code):int}
//This is the common response it will goes through (or common for) all api
const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response.status,
      msg: response.msg,
      code: response?.code,
    };
  }
};
//  if success --> return { isSuccess:true, data(aactual): object}
const processError = (error) => {
  if (error.response) {
    // request sent successfully but server respond with status code other than 200 or out of range status code (2.x.x)
    console.log("ERROR IN RESPONSE", error.toJSON());
    return {
      isError: true,
      message: API_NOTIFICATION_MESSAGES.responseFailure,
      code: error.response.status,
    };
  } else if (error.request) {
    // request sent success but no response received i.e may be server closed or network issues
    console.log("ERROR IN REQUEST", error.toJSON());
    return {
      isError: true,
      message: API_NOTIFICATION_MESSAGES.requestFailure,
      code: "",
    };
  } else {
    // something happens in setting up the request that triggers an error
    console.log("ERROR IN Network", error.toJSON());
    return {
      isError: true,
      message: API_NOTIFICATION_MESSAGES.networkError,
      code: "",
    };
  }
};
//Now we will create actual api
const API = {};
for (const [key, value] of Object.entries(SERVICE_URLs)) {
  //ye object ki ekek value utha ke dega(serviceurl objest ki)
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: body,
      responseType: value.responseType,
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentageCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentageCompleted);
        }
      },
    });
}
export { API };
