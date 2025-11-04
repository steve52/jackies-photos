import { type SearchAssetResponseDto, type SearchResponseDto, type TagResponseDto } from "@immich/sdk";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getTags = async (): Promise<TagResponseDto[]> => {
  return fetch(`${API_BASE_URL}/tags`)
      .then((res) => res.json())
      .then((data:  TagResponseDto[]) => {
        return data
      });
}


export const searchByTags = async (tags: TagResponseDto[]): Promise<SearchAssetResponseDto> => {
  const tagIds = tags.map(t => t.id)
  return fetch(`${API_BASE_URL}/search/metadata`, {method: "POST", body:JSON.stringify({tagIds: tagIds})})
      .then((res) => res.json())
      .then((data:  SearchResponseDto) => {
        return data.assets
      });
}

