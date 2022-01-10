import React, { useState } from 'react';
import * as styles from './Card.styles';

export type TCard = {
  children?: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  selectBorderColor?: string;
  noModal?: boolean;
};
export default function Card({
  onClick,
  children,
  selected,
  selectBorderColor = '#c7ffc7',
  noModal,
}: TCard) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <styles.BaseCard
        selected={selected}
        onClick={() => {
          onClick && onClick();
          !noModal && setOpenModal(true);
        }}
        selectBorderColor={selectBorderColor}
      >
        <div>{children}</div>
      </styles.BaseCard>
      {openModal && (
        <styles.ModalWrapper onClick={() => setOpenModal(false)}>
          <styles.ModalChild>{children}</styles.ModalChild>
        </styles.ModalWrapper>
      )}
    </>
  );
}
