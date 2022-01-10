import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef } from 'react';
import Button from '../../components/Button';
import Form from '../../components/Form';
import { auth } from '../../firebase';

export default function Login() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (emailRef?.current?.value && passwordRef?.current?.value) {
      try {
        await signInWithEmailAndPassword(
          auth,
          emailRef.current.value,
          passwordRef.current.value
        );
      } catch (e) {}
    }
  };
  return (
    <div>
      <div>login</div>
      <Form onSubmit={handleSubmit}>
        <input type='text' placeholder='email' ref={emailRef} />
        <input type='password' placeholder='password' ref={passwordRef} />
        <Button type='submit'>submit</Button>
      </Form>
    </div>
  );
}
