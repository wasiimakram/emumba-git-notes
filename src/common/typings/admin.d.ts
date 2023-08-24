export type AdminAvailablity = string[];
export interface AdminStats {
  key: string;
  name: string;
  hours: number;
  average: number;
}
export interface AdminSettings {
  key?: string | null;
  name: string;
  email: string;
  position: string;
  hours: string;
  average_hours: string;
}
export interface Data {
  [key: string]: AdminAvailablity;
}
export type Category = "Present" | "OnLeave" | "Absent";
export type AdminName = string;

export interface AddButtonProps {
  addUser: (event: React.MouseEvent) => void;
}
export interface TableProps {
  setSelectedUser: React.Dispatch<React.SetStateAction<AdminSettings | null>>;
  setIsAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedKey: React.Dispatch<React.SetStateAction<string | null>>;
  setIsDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  pageData: AdminSettings[];
}
