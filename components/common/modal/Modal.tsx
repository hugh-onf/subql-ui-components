// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Modal as AntdModal, ModalProps } from 'antd';
import { Button, Typography } from '..';
import styles from './Modal.module.css';

interface Props extends ModalProps {
  title?: string;
  description?: string | React.ReactNode;
  submitText?: string;
  onSubmit?: () => void | Promise<void>;
  cancelText?: string;
  onCancel?: () => void;
}

// TODO: modify var of ant to remove footer borderTop
export const Modal: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  description,
  submitText,
  onSubmit,
  cancelText,
  onCancel,
  children,
  ...modalProps
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const sortedDescription = description ? (
    <div className={styles.description}>
      {typeof description === 'string' ? <Typography>{description}</Typography> : description}
    </div>
  ) : undefined;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onSubmit?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AntdModal
      title={title}
      cancelText={cancelText}
      okText={submitText}
      onCancel={onCancel}
      cancelButtonProps={{ shape: 'round' }}
      onOk={handleSubmit}
      okButtonProps={{ shape: 'round' }}
      confirmLoading={loading}
      {...modalProps}
      // className={styles.container}
      className={'modalStyle'}
    >
      <>
        {sortedDescription}
        {children}
      </>
    </AntdModal>
  );
};
