import React from "react";
import ky from "ky";

export const Fib = () => {
  const [seenIndexes, setSeenIndexes] = React.useState([]);
  const [values, setValues] = React.useState({});
  const [index, setIndex] = React.useState("");
  console.log("index: ", index);

  const fetchValues = async () => {
    const v =  await ky.get(
      "/api/values/current"
    ).json();
    setValues(v);
  };

  const fetchIndices = async () => {
    const si = await ky.get(
      "/api/values/all"
    ).json();
    setSeenIndexes(si);
  };


  React.useEffect(
    () => {
      fetchValues();
      fetchIndices();
    } ,[]
  );

  const onChange = (e) =>
    setIndex(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await ky.post(
      "/api/values",
      {
        json: {
          index: index,
        }
      }
    );
    setIndex("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={index}
          onChange={onChange}
        />
        <button>Submit</button>
      </form>

      <h3>Indices I have seen:</h3>
      {seenIndexes.map(({ number }) => number).join(", ")}
      <h3>Calculated Values:</h3>
      {Object.entries(values).map(([key, value]) => (
        <div key={key}>
          For index {key}, I calculated {value}
        </div>
      ))}
    </div>
  );
};
