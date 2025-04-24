export interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  addTask: (title: string) => void;
}
