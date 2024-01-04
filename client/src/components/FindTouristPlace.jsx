import axios from "axios";
import { useEffect, useState } from "react";
import {
  default as CopyToClipboardButton,
  default as copyToClipboard,
} from "./copyToClipBoard";

export default function FindTouristPlace() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []); // Fetch all data initially
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4001/trips?keywords=${searchText}`
      );
      setAllData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchText === "") {
      setSearchResult(allData);
    } else {
      const filteredData = allData.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResult(filteredData);
    }
  }, [searchText, allData]);

  const handleSendTextToSearchText = (tag) => {
    if (searchText === "") {
      setSearchText(tag);
    } else {
      setSearchText((prevSearchText) => `${prevSearchText} ${tag}`);
    }
  };

  return (
    <div className="main-container flex flex-col justify-center items-center bg-orange-200 ">
      <div
        className="text-4xl mt-[30px] mb-[20px] text-blue-700"
        style={{ fontFamily: "Prompt, sans-serif" }}
      >
        เที่ยวไหนดี
      </div>
      <div className="flex  w-[820px]">
        <h1>ค้นหาสถานที่ท่องเที่ยว</h1>
      </div>
      <input
        type="text"
        className="search-text mb-[10px] w-[820px] text-center border-[1px] border-solid border-[blue] shadow-xl"
        placeholder="หาที่เที่ยวแล้วไปกัน"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {searchText.length === 0 && (
        <>
          {allData.map((item, index) => (
            <div
              className="blog-content-container flex justify-center items-center m-[10px] p-[10px] "
              key={index}
            >
              <div className="blog-image-container">
                <img
                  className="blog-image rounded-[10px] object-cover w-[250px] h-[210px] shadow-xl"
                  src={item.photos[0]}
                />
              </div>

              <div className="blog-info-container relative">
                <li
                  className="blog-title font-bold ml-[20px] max-w-[400px] mt-[0px] list-none"
                  style={{ fontFamily: "Prompt, sans-serif" }}
                >
                  {item.title}
                </li>
                <li
                  className="blog-description ml-[20px]   truncate max-w-screen-md mx-auto list-none"
                  style={{
                    maxWidth: "79ch",
                    fontFamily: "Prompt, sans-serif",
                    fontStyle: "italic",
                  }}
                >
                  {item.description}
                </li>
                <a
                  href={item.url}
                  className="text-blue-500 underline  ml-[20px] "
                >
                  อ่านต่อ
                </a>
                <div className="flex ">
                  <div className=" ml-[20px]">หมวด</div>
                  <li className="blog-tags ml-[20px] w-[600px] h-[30px] list-none">
                    {item.tags.map((tag, index) => (
                      <button
                        key={index}
                        className="mr-2 underline"
                        onClick={() => handleSendTextToSearchText(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </li>
                </div>
                <div className="flex ml-[20px] w-[350px] mt-[1px] shadow-sm">
                  {item.photos.slice(1).map((photos, index) => (
                    <img
                      key={index}
                      src={photos}
                      className="object-cover w-[100px] h-[100px] rounded-[10px] mr-[15px]"
                    />
                  ))}
                </div>
                <button onClick={() => copyToClipboard(item.url)}></button>
                <CopyToClipboardButton text={item.url} />
              </div>
            </div>
          ))}
        </>
      )}
      {searchText.length > 0 && (
        <>
          {searchResult.map((item, index) => (
            <div
              className="blog-content-container flex justify-center items-center m-[10px] p-[10px]"
              key={index}
            >
              <div className="">
                <img
                  className="blog-image rounded-[10px] object-cover w-[250px] h-[210px]"
                  src={item.photos[0]}
                />
              </div>

              <div className="blog-info-container relative">
                <li className="blog-title font-bold ml-[20px] max-w-[400px] truncate">
                  {item.title}
                </li>
                <li
                  className="blog-description ml-[20px]   truncate max-w-screen-md mx-auto"
                  style={{ maxWidth: "79ch" }}
                >
                  {item.description}
                </li>
                <a
                  href={item.url}
                  className="text-blue-500 underline  ml-[20px] "
                >
                  อ่านต่อ
                </a>
                <div className="flex ">
                  <div className=" ml-[20px]">หมวด</div>
                  <li className="blog-tags ml-[20px] w-[500px] h-[30px] ">
                    {item.tags.map((tag, index) => (
                      <button
                        key={index}
                        className="mr-2 underline"
                        onClick={() => handleSendTextToSearchText(tag, index)}
                      >
                        {tag}
                      </button>
                    ))}
                  </li>
                </div>
                <div className="flex ml-[20px] w-[350px] mt-[1px] mr-[10px]">
                  {item.photos.slice(1).map((photos, index) => (
                    <img
                      key={index}
                      src={photos}
                      className="object-cover w-[100px] h-[100px] rounded-[10px] mr-[15px]"
                    />
                  ))}
                </div>
                <button onClick={() => copyToClipboard(item.url)}></button>
                <CopyToClipboardButton text={item.url} />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
