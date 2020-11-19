import React, { useState, useEffect } from "react";
import loadImagesRequest from "./apicallFile";
import "./App.css";
export default function App() {
  const [photos, updatePhotos] = useState([]);
  const [initialPageNumber, updatePageNumber] = useState(10);
  const [isBottom, setIsBottom] = useState(false);
  useEffect(() => {
    async function fetchData() {
      let apiData = await loadImagesRequest(initialPageNumber);
      updatePhotos(apiData);
    }
    fetchData();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (isBottom) {
      updatePageNumber(initialPageNumber + 10);
      setIsBottom(false);
      async function fetchData() {
        let apiData = await loadImagesRequest(initialPageNumber);
        updatePhotos(apiData);
      }
      fetchData();
    }
  }, [isBottom]);
  function handleScroll() {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
      setIsBottom(true);
    }
  }
  return (
    <div className="parentsection">
      {photos.map((item, index) => {
        return (
          <div className="grid" key={index}>
            <img src={item.urls.regular} alt={item.id} />
          </div>
        );
      })}
    </div>
  );
}
