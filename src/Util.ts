import { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export default class Util {
  public static getHeader(): AxiosRequestConfig["headers"] {
    const token = Cookies.get("token");

    if (token) {      
      return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };
    }

    return {
      "Content-Type": "application/json",
    };
  }
}
