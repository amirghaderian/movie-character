import { XCircleIcon } from "@heroicons/react/24/outline";

const Modal = ({ title, children, onOpen, open }) => {
  const handler = (e) => {
    if (e.target !== e.currentTarget) return;
    onOpen(false);
  };
  if (!open) return null;
  return (
    <div>
      <div className="backdrop" onClick={handler}>
        <div className="modal">
          <div className="modal__header">
            <h2 className="title">{title}</h2>
            <button onClick={() => onOpen(false)}>
              <XCircleIcon className="icon close" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
