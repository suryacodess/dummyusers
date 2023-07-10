import React from "react";
import { useState, useEffect } from "react";
import "./sass/styles.css";

const Main = () => {
  const [searchInput, setSearchInput] = useState(" ");
  const [data, setData] = useState([]);

  const fetchUsers = async () => {
    await fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((res) => {
        setData(res.users);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <header className="header">
        <h1>USER APP</h1>
        <div className="search">
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            type="search"
            placeholder="enter user name"
          />
        </div>
      </header>

      <main className="main">
        <div className="main-inner">
          {data
            .filter((name) => {
              if (searchInput === " ") {
                return name;
              } else if (
                name.firstName.toLowerCase().includes(searchInput.toLowerCase())
              ) {
                return name;
              } else if (
                name.lastName.toLowerCase().includes(searchInput.toLowerCase())
              ) {
                return name;
              } else if (
                name.maidenName
                  .toLowerCase()
                  .includes(searchInput.toLowerCase())
              ) {
                return name;
              }
            })
            .map((data, i) => {
              return (
                <>
                  <div className="user-data" key={i}>
                    <div className="user-avatar">
                      <img src={data.image} alt={data.firstName} />
                    </div>

                    <div className="user-text">
                      <p>first Name : {data.firstName}</p>
                      <p>last Name : {data.lastName}</p>
                      <p>Maiden Name : {data.maidenName}</p>
                      <p>
                        age :{" "}
                        {data.age === undefined ? "not available" : data.age}
                      </p>
                      <p>gender : {data.gender}</p>
                      <p>email : {data.email}</p>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </main>
    </>
  );
};

export default Main;
