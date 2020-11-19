import axios from "axios";

export default function loadImagesRequest(query) {
  return axios
    .get(
      `https://api.unsplash.com/photos/random?count=${query}&client_id=${process.env.REACT_APP_UNSPLASH_CLIENT_ID}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return [];
    });
}
