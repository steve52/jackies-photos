import { useEffect, useState } from "react";
import { getTags, searchByTags } from "./api";
import type { AssetResponseDto, TagResponseDto } from "@immich/sdk";

const ForSarah = () => {
  const [tags, setTags] = useState<TagResponseDto[]>([]);
  const [assets, setAssets] = useState<AssetResponseDto[]>([]);

  useEffect(() => {
    getTags().then((data) => {
      setTags(data);
    });
  }, []);

  useEffect(() => {
    searchByTags(tags).then((data) => {
      console.log("~~~ data", data);
      setAssets(data.items);
    });
  }, []);

  const onAddTag = (e) => {
    console.log("~~~ onAddTag", e);
  };

  return (
    <>
      <h1>For Sarah</h1>
      <input onSubmit={onAddTag} />
      <button>Clear all</button>

      {assets[0]?.id && <img src={`/api/assets/${assets[0]?.id}/thumbnail`} />}
    </>
  );
};

export default ForSarah;
