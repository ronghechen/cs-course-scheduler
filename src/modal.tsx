import { type PropsWithChildren } from 'react'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const Modal = ({ isOpen, onClose, children }: PropsWithChildren<ModalProps>) => (
  !isOpen ? null : (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/75 z-50"
      onClick={onClose} // Closes when clicking backdrop
    >
      <div 
        className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
        <button 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
);

export default Modal;
