import { MouseEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { SlLogout, SlPlus } from 'react-icons/sl';
import IconButton from '@/components/IconButton';
import Filter from '@/components/Filter';
import LinkWithQuery from '@/components/LinkWithQuery';
import { getIsContactsPage } from '@/utils';
import { IconBtnType, IconSizes, PagePaths } from '@/constants';
import { LinkContainer } from './PrivateLinks.styled';

const PrivateLinks = () => {
  // const contacts = useAppSelector(selectContacts);
  const contacts = [];
  const { pathname } = useLocation();
  const isContactsPage = getIsContactsPage(pathname);
  const showFilter = isContactsPage && Boolean(contacts.length);

  const onLogoutBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    // makeBlur(e.currentTarget);
    // dispatch(signOutUser())
    //   .unwrap()
    //   .then(() => {
    //     toasts.successToast('Goodbye!');
    //     navigate(PagePaths.homePath);
    //   })
    //   .catch((error) => {
    //     toasts.errorToast(error);
    //   });
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
