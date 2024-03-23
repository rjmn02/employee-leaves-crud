import React from 'react';
import { ErrorModalProps, SuccessModalProps } from '@/lib/interfaces';

export const ErrorModal: React.FC<ErrorModalProps> = ({ show, message }) => {
  if (!show) return null;

  return (
    <div className='bg-error' style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', padding: '20px 80px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      <p className='font-bold'>{message}</p>
    </div>
  );
};

export const SuccessModal: React.FC<SuccessModalProps> = ({ show, message }) => {
  if (!show) return null;

  return (
    <div className='bg-success' style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      <p className='font-bold'>{message}</p>
    </div>
  );
};