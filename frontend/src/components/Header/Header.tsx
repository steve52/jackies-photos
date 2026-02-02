import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import type { TagResponseDto } from "@immich/sdk";
import { AutoComplete } from "antd";
import { useState } from "react";
import TagList from "../TagList/TagList";
import styles from "./Header.module.scss";

type HeaderPropsType = {
  tags: TagResponseDto[];
  addTag: (tag: string) => void;
  removeTag: (tag: TagResponseDto) => void;
  selectedTags: TagResponseDto[];
};

const Header = ({ tags, addTag, removeTag, selectedTags }: HeaderPropsType) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [noMatchingTags, setNoMatchingTags] = useState(false);
  const [filteredTags, setFilteredTags] = useState<TagResponseDto[]>(tags);

  const onSelect = (value: string) => {
    addTag(value);
    setSearchTerm("");
  };

  return (
    <header
      style={{ display: "flex", flexDirection: "column" }}
      className={styles.header}
    >
      <div className={styles.searchAndTitleWrapper}>
        <div
          className={`${styles.searchBar} ${showSearchBar ? styles.showSearchBar : ""} ${noMatchingTags ? styles.noMatchingTags : ""}`}
        >
          <button
            className={styles.searchBtn}
            onClick={() => {
              setShowSearchBar(!showSearchBar);
            }}
          >
            <SearchOutlined />
          </button>
          <AutoComplete
            options={filteredTags}
            className={styles.searchInput}
            value={searchTerm}
            onChange={(value) => setSearchTerm(value)}
            onSelect={onSelect}
            variant="borderless"
            onSearch={(text) => {
              const filteredTags = tags.filter((t) =>
                t.name.toLowerCase().includes(text.toLowerCase()),
              );
              setNoMatchingTags(!filteredTags.length);
              setFilteredTags(filteredTags);
            }}
          />
          {showSearchBar && noMatchingTags && (
            <span className={styles.noMatchingTagsLabel}>none</span>
          )}
          {showSearchBar && (
            <button
              className={styles.closeBtn}
              onClick={() => {
                setShowSearchBar(false);
              }}
            >
              <CloseOutlined />
            </button>
          )}
        </div>
        {!showSearchBar && (
          <div className={styles.pageHeading}>
            <span className={styles.pageheadingYugen}>yūgen fotografi</span>
            <span className={styles.pageHeadingSlash}>/</span>
            <h1 className={styles.pageHeadingTitle}>For Sarah</h1>
          </div>
        )}
        {!showSearchBar && (
          <span className={styles.pageHeadingYears}>1930-2006</span>
        )}
      </div>
      <TagList
        tags={selectedTags}
        removeTag={removeTag}
        className={styles.tagsList}
      />
    </header>
  );
};

export default Header;
