import React, { Fragment, useState } from 'react';
import { Button, Modal } from 'react-bulma-components';

interface Props {
  buttonLabel: string
  buttonColor: 'primary' | 'danger'

  modalHeader: string
  modalDescription: string
  confirmLabel: string
  cancelLabel: string

  onConfirm: () => void
  loading?: boolean
}

const ButtonWithConfirmation: React.FC<Props> = ({
  buttonLabel,
  buttonColor,
  modalHeader,
  modalDescription,
  confirmLabel,
  cancelLabel,
  onConfirm,
  loading = false
}) => {
  const [show, setShow] = useState<boolean>(false);

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Fragment>
      <Button color={buttonColor} onClick={handleOpen}>
        {buttonLabel}
      </Button>

      <Modal show={show} showClose={false}>
        <Modal.Card>
          <Modal.Card.Header showClose={false}>
            <Modal.Card.Title>
              {modalHeader}
            </Modal.Card.Title>
          </Modal.Card.Header>

          <Modal.Card.Body>
            {modalDescription}
          </Modal.Card.Body>

          <Modal.Card.Footer>
            <Button.Group align="right" style={{ flex: 1 }}>
              <Button color={buttonColor} onClick={onConfirm} loading={loading}>
                {confirmLabel}
              </Button>

              <Button color="gray" onClick={handleClose}>
                {cancelLabel}
              </Button>
            </Button.Group>
          </Modal.Card.Footer>
        </Modal.Card>
      </Modal>
    </Fragment>
  );
};

export default ButtonWithConfirmation;
