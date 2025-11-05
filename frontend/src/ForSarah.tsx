import { useEffect, useState } from "react";
import { getTags, getTotalImageCount, searchByTags } from "./api";
import type { AssetResponseDto, TagResponseDto } from "@immich/sdk";
import { AutoComplete } from "antd";

const ForSarah = () => {
  const [tags, setTags] = useState<TagResponseDto[]>([]);
  const [total, setTotal] = useState<number>();
  const [selectedTags, setSelectedTags] = useState<TagResponseDto[]>([]);
  const [assets, setAssets] = useState<AssetResponseDto[]>([]);

  useEffect(() => {
    getTags().then((data) => {
      setTags(data);
    });
    getTotalImageCount().then((data) => {
      setTotal(data.total);
    });
  }, []);

  useEffect(() => {
    searchByTags(selectedTags).then((data) => {
      console.log("~~~ data", data);
      setAssets(data.items);
    });
  }, [selectedTags]);

  const onAddTag = (tag: string) => {
    const tagObj = tags.find((t) => t.name === tag);
    if (tagObj) {
      setSelectedTags(selectedTags.concat(tagObj));
    }
  };

  return (
    <>
      <h1>For Sarah</h1>
      <AutoComplete
        options={tags}
        style={{ width: 200 }}
        onSelect={onAddTag}
        onSearch={(text) => {
          const filteredTags = tags.filter((t) => t.name.startsWith(text));
          console.log("~~~ filteredTags", filteredTags);
          return filteredTags;
        }}
      />
      <br></br>
      <button
        onClick={() => {
          setSelectedTags([]);
        }}
      >
        Clear all
      </button>
      {assets.length}/{total}
      selectedTags: {selectedTags.length}
      <ul>
        {assets.map((asset) => {
          return (
            <li>
              <img src={`/api/assets/${asset.id}/thumbnail`} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ForSarah;
