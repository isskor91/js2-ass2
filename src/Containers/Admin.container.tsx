import React from 'react';
import { FlexBox } from '../components/FlexBox/FlexBox';
import MenuButton from '../components/MenuButton';
import SideNav from '../modules/SideNav';

export type TAdminContainer = {
  children?: React.ReactNode;
};

export default function AdminContainer({ children }: TAdminContainer) {
  return (
    <FlexBox width={'100%'}>
      <SideNav />
      <FlexBox flex={1} flexDirection={'column'} gap={20} width={'100%'}>
        <MenuButton />
        {children}
      </FlexBox>
    </FlexBox>
  );
}
