import type { AssetResponseDto } from "@immich/sdk";
import { DownloadOutlined, ZoomInOutlined } from "@ant-design/icons";
import ActionButton from "../ActionButton/ActionButton";
import styles from "./AssetTile.module.scss";
import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type AssetTilePropsType = {
  asset: AssetResponseDto;
};

const AssetTile = ({ asset }: AssetTilePropsType) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <div className={styles.assetTile}>
      <img
        src={`${API_BASE_URL}/assets/${asset.id}/thumbnail`}
        className={styles.thumbnail}
        onLoad={() => setImgLoaded(true)}
      />
      {imgLoaded && (
        <div className={styles.actionButtonContainer}>
          <ActionButton Icon={DownloadOutlined} />
          <ActionButton Icon={ZoomInOutlined} />
        </div>
      )}
    </div>
  );
};

export default AssetTile;
