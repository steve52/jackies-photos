import { useEffect, useState } from "react";
import "./App.css";

type Tag = {
  id: string;
  name: string;
  value: string;
};

function App() {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    fetch("api/tags")
      .then((res) => res.json())
      .then((data) => {
        setTags(data);
      });
  }, []);

  return (
    <>
      <h3>Tags:</h3>
      <ul>
        {tags.map((tag) => {
          return <li key={tag.id}>{tag.name}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
