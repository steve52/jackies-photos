import { useEffect, useState } from "react";
import { getTags, getTotalImageCount, searchByTags } from "../api";
import type { AssetResponseDto, TagResponseDto } from "@immich/sdk";
import Header from "../components/Header/Header";
import AssetTiles from "../components/AssetTiles/AssetTiles";
import AssetCount from "../components/AssetCount/AssetCount";
import ClearFiltersBtn from "../components/ClearFiltersBtn/ClearFiltersBtn";
import styles from "./Home.module.scss";

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
      setAssets(data.items);
    });
  }, [selectedTags]);

  const addTag = (tag: string) => {
    const tagObj = tags.find((t) => t.name === tag);
    if (tagObj) {
      setSelectedTags(selectedTags.concat(tagObj));
    }
  };

  const removeTag = (removedTag: TagResponseDto) => {
    const newTags = selectedTags.filter((tag) => tag.id !== removedTag.id);
    setSelectedTags(newTags);
  };

  const clearFilters = () => {
    setSelectedTags([]);
  };

  return (
    <div>
      <Header
        tags={tags}
        addTag={addTag}
        removeTag={removeTag}
        selectedTags={selectedTags}
      />

      <AssetTiles assets={assets} />

      <div className={styles.assetCountAndClearBtn}>
        <AssetCount count={assets.length} total={total || 0} />
        <ClearFiltersBtn clearFilters={clearFilters} />
      </div>
    </div>
  );
};

export default ForSarah;
