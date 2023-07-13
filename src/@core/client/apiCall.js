import axios from "./http";
import qs from "qs";

const ApiCall = async (
  method,
  path,
  data,
  params,
  formatResult,
  uploadprogress
) => {
  return await axios({
    url: path,
    method,
    params,
    // headers: {
    //   Accept: "application/json",
    //   "Content-Type": "application/json",
    // },
    data:
      method.toLowerCase() === "post" || method.toLowerCase() === "put"
        ? qs.stringify(data)
        : data,
    onUploadProgress: function (progressEvent) {
      if (uploadprogress) {
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        uploadprogress(percentCompleted);
      }
    },
  }).then((res) => (formatResult ? formatResult(res) : res));
};

export default ApiCall;
