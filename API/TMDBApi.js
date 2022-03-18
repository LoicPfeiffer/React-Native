import axios from "axios";
import { API_TOKEN } from "@env";

const getFilmsFromApiWithSearchedText = async (text, page) => {
  const url =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    API_TOKEN +
    "&language=fr&query=" +
    text +
    "&page=" +
    page;
  const response = await axios.get(url);
  console.log("--getFilmsFromApiWithSearchedText--");
  console.log(url);
  console.log(response.data);
  console.log("--fin getFilmsFromApiWithSearchedText--");
  return response.data;
};

export default getFilmsFromApiWithSearchedText;
