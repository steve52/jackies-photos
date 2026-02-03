import type { AssetResponseDto } from "@immich/sdk";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import styles from "./AssetTiles.module.scss";
import AssetTile from "../AssetTile/AssetTile";

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
          return <AssetTile key={asset.id} asset={asset} />;
        })}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default AssetTiles;
