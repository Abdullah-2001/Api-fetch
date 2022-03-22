import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState([]);

  const fetchData = async () => {
    if (search !== "") {
      setSearch("");
      setLoading(true);
      const data = await fetch(
        `https://saavn.me/search/songs?query=${search}&page=1&limit=40`
      );
      const response = await data.json();
      setSongs(response.results);
      setLoading(false);
    } else {
      return null;
    }
  };

  useEffect(() => {
    console.log(songs);
  }, [songs]);

  return (
    <div className="App">
      <div style={{ textAlign: "center" }}>
        <input
          value={search}
          type="text"
          placeholder="Search your songs"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => fetchData()}>Search</button>
      </div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "90vh",
          }}
        >
          <p style={{ fontSize: "30px" }}>Loading...</p>
        </div>
      ) : (
        <>
          {songs.map((song, index) => {
            let sDuration = Math.floor(songs[index].duration % 60);
            let mDuration = Math.floor(songs[index].duration / 60);
            return (
              <div key={index} style={{ display: "flex", margin: "50px" }}>
                <img
                  style={{
                    width: "250px",
                    height: "250px",
                    objectFit: "cover",
                  }}
                  src={song.image[2].link}
                />
                <div style={{ margin: "0 30px" }}>
                  <p
                    style={{
                      margin: "0 0 15px 0",
                      fontSize: "26px",
                      fontWeight: "600",
                    }}
                  >
                    {song.name}
                  </p>
                  <p style={{ margin: "0 0 15px 0", fontSize: "18px" }}>
                    {`${song.name} by ${song.primaryArtists}`}
                  </p>
                  <p style={{ margin: "0 0 15px 0", fontSize: "18px" }}>
                    {`Song . ${song.playCount} Plays . ${mDuration}:${sDuration} ${song.language}`}
                  </p>
                  <p style={{ margin: "0 0 15px 0", fontSize: "18px" }}>
                    {song.copyright}
                  </p>
                  <audio
                    controls
                    style={{ margin: "20px 0 0 0" }}
                  >
                    <source src={song.downloadUrl[4]?.link} />
                  </audio>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default App;
