import { CloseOutlined } from "@ant-design/icons";
import styles from "./Tag.module.scss";
import type { TagResponseDto } from "@immich/sdk";

type TagPropsType = {
  tag: TagResponseDto;
  removeTag: (tag: TagResponseDto) => void;
};

const Tag = ({ removeTag, tag }: TagPropsType) => {
  return (
    <div className={styles.tag}>
      {tag.name}
      <button
        className={styles.closeBtn}
        onClick={(e) => {
          e.preventDefault();
          removeTag(tag);
        }}
      >
        <CloseOutlined />
      </button>
    </div>
  );
};

export default Tag;
