
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type Tag = {
  id: string;
  name: string;
  value: string;
};

export const getTags = async (): Promise<Tag[]> => {
  return fetch(`${API_BASE_URL}/tags`)
      .then((res) => res.json())
      .then((data:  Tag[]) => {
        return data
      });
}

