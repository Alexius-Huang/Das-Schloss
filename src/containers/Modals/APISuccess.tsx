import React from 'react';
import Modal from '../../components/Modal';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux.actions/ui';

interface APISuccessModalProps {
  action: 'Update' | 'Create' | 'Delete';
  name: string;
}

const APISuccessModal: React.FC<APISuccessModalProps> = (props) => {
  const dispatch = useDispatch();
  const pastTenseAction =
    (props.action === 'Update') ? 'updated' :
    (props.action === 'Create') ? 'created' : 'deleted';

  return (
    <Modal
      classnames="modal__api-success"
      width={300}
      height="auto"
      onClose={() => dispatch(closeModal())}
      closeAfterTime={3000}
    >
      <h1 className="api-success__header">{props.action} Success</h1>
      <p className="api-success__message">"{props.name}" has been {pastTenseAction}.</p>
    </Modal>
  );
}

export default APISuccessModal;
