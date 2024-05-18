import { MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SlLogout, SlPlus } from 'react-icons/sl';
import IconButton from '@/components/IconButton';
import Filter from '@/components/Filter';
import LinkWithQuery from '@/components/LinkWithQuery';
import { getIsContactsPage, makeBlur, toasts } from '@/utils';
import { IconBtnType, IconSizes, PagePaths } from '@/constants';
import { LinkContainer } from './PrivateLinks.styled';
import { useAuthStore, useContactsStore } from '@/zustand/store';
import { selectSignOut } from '@/zustand/auth/selectors';
import { selectContacts } from '@/zustand/contacts/selectors';

const PrivateLinks = () => {
  const contacts = useContactsStore(selectContacts);
  const { pathname } = useLocation();
  const isContactsPage = getIsContactsPage(pathname);
  const showFilter = isContactsPage && Boolean(contacts?.length);
  const signOut = useAuthStore(selectSignOut);
  const navigate = useNavigate();

  const onLogoutBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    makeBlur(e.currentTarget);

    signOut()
      .then(() => {
        toasts.successToast('Goodbye!');
        navigate(PagePaths.homePath);
      })
      .catch((error) => {
        if (error instanceof Error) {
          toasts.errorToast(error.message);
        }
      });
  };

  return (
    <LinkContainer>
      {showFilter && <Filter />}
      <LinkWithQuery to={PagePaths.addNewContactPath}>
        <SlPlus />
        <span>New Contact</span>
      </LinkWithQuery>
      <IconButton
        btnType={IconBtnType.logout}
        onBtnClick={onLogoutBtnClick}
        icon={<SlLogout size={IconSizes.otherIconSize} />}
        title="Signout"
      />
    </LinkContainer>
  );
};

export default PrivateLinks;
