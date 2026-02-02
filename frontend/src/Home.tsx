import { useEffect, useState } from "react";
import { getTags, getTotalImageCount, searchByTags } from "./api";
import type { AssetResponseDto, TagResponseDto } from "@immich/sdk";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Header from "./components/Header/Header";

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

  return (
    <div>
      <Header
        tags={tags}
        addTag={addTag}
        removeTag={removeTag}
        selectedTags={selectedTags}
      />
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 2 }}
        gutterBreakPoints={{ 350: "12px", 750: "30px" }}
        className="photo-tiles"
      >
        <Masonry>
          {assets.map((asset) => {
            return (
              <>
                <img
                  src={`/api/assets/${asset.id}/thumbnail`}
                  className="img"
                />
              </>
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
      <div className="clear-button-floater">
        <button
          onClick={() => {
            setSelectedTags([]);
          }}
        >
          Clear all
        </button>
        {assets.length}/{total}
      </div>
    </div>
  );
};

export default ForSarah;
