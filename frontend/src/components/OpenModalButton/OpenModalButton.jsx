import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent,
  buttonText,
  onButtonClick,
  onModalClose,
  classNames,
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === 'function') onButtonClick();
  };

  return (
    <button className={classNames} onClick={onClick}>
      {buttonText}
    </button>
  );
}

export default OpenModalButton;
