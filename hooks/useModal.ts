import { ModalContext } from 'providers/ModalProvider';
import { useContext } from 'react';

export const useModal = () => {
  const context = useContext(ModalContext);
  return context;
};
