export interface UpdateModel {
  lastVersion: string;
  showMessage: boolean;
  lastUpdateDate: number;
  previousVersion?: string;
}

export interface UpdateResponseModel {
  version: string;
}

export interface Features {
  searchEngines: string[];
}
