import { useEffect, useState } from "react";
import "./App.css";
import { getTags, type Tag } from "./api";

function App() {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    getTags().then((data) => {
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
