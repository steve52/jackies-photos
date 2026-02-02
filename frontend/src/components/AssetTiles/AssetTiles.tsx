import type { AssetResponseDto } from "@immich/sdk";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import styles from "./AssetTiles.module.scss";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type AssetTilesProps = {
  assets: AssetResponseDto[];
};

const AssetTiles = ({ assets }: AssetTilesProps) => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 2 }}
      gutterBreakPoints={{ 350: "12px", 750: "30px" }}
      className={styles.tiles}
    >
      <Masonry>
        {assets.map((asset) => {
          return (
            <>
              <img
                src={`${API_BASE_URL}/api/assets/${asset.id}/thumbnail`}
                className={styles.thumbnail}
              />
            </>
          );
        })}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default AssetTiles;
