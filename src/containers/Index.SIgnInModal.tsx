import React from 'react';
import Modal from '../components/Modal';
import Form, { TextField } from '../components/Form';
import { closeModal } from '../actions/ui';
import { useDispatch } from 'react-redux';

const SignInModal: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <Modal
      classnames="modal__signin"
      width={300}
      height="auto"
      onClose={() => dispatch(closeModal())}
    >
      <Form title="Sign In" name="sign-in" onSubmit={() => console.log('hello')}>
        <TextField
          title="Email"
          name="email"
          placeholder="Your Email"
          value=""
          // onInput={v => setE(v)}
          // bindState={setE}
        />
        <TextField
          title="Password"
          name="password"
          placeholder="Your Password"
          value=""
          // onInput={v => setE(v)}
          // bindState={setE}
        />
      </Form>
    </Modal>
  );
};

export default SignInModal;
