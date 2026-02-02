import type { TagResponseDto } from "@immich/sdk";
import Tag from "../Tag/Tag";
import styles from "./Taglist.module.scss";

type TagsPropsType = {
  tags: TagResponseDto[];
  removeTag: (tag: TagResponseDto) => void;
  className?: string;
};

const TagList = ({ tags, removeTag, className = "" }: TagsPropsType) => {
  return (
    <ul className={`${styles.tagList} ${className}`}>
      {tags.map((tag) => {
        return (
          <li key={tag.id}>
            <Tag removeTag={removeTag} tag={tag} />
          </li>
        );
      })}
    </ul>
  );
};

export default TagList;
