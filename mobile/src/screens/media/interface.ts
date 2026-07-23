export interface IMedia {
  id: string;
  type: string | null;
  name: string | null;
}

export interface StoredFile {
  error?: string;
  id: string;
  name: string;
  fileCategory?: string;
  url: string;
  size: number;
  type: string;
  temporary: boolean;
}
