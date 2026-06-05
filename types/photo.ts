export interface Photo {
  _id: string;
  title: string;
  description: string;
  urls: string[];
  sectionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePhoto {
  title: string;
  description: string;
  urls: string[];
  sectionId: string;
}

export interface UpdatePhoto {
  title?: string;
  description?: string;
  urls?: string[];
}
