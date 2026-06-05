export interface Section {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSection {
  title: string;
  description: string;
}

export interface UpdateSection {
  title?: string;
  description?: string;
}
