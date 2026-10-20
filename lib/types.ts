export type ExtensionStatus = "active" | "inactive";
export type Filter = "all" | ExtensionStatus;

export type Extension = {
  id: string;
  name: string;
  description: string;
  status: ExtensionStatus;
  avatarUrl: string;
  dateCreated: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
  timestamp: string;
};
