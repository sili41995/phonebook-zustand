import { ChangeEvent, FC, Suspense, useRef, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { NavLink, Outlet } from 'react-router-dom';
import { IProps } from './ContactProfile.types';
import Loader from '@/components/Loader';
import ImageContainer from '@/components/ImageContainer';
import EditContactForm from '@/components/EditContactForm';
import { Messages, PagePaths } from '@/constants';
import { getProfileFormData, onChangeAvatar, toasts } from '@/utils';
import { IAvatar } from '@/types/types';
import { ContactDesc, ContactName, ContactTitle, ListItem, NavBar, NavList } from './ContactProfile.styled';
import { useContactsStore } from '@/zustand/store';
import { selectUpdateContactAvatar } from '@/zustand/contacts/selectors';

const ContactProfile: FC<IProps> = ({ contact, editContact, ...otherProps }) => {
  const [contactAvatar, setContactAvatar] = useState<FileList | null>(null);
  const updateContactAvatar = useContactsStore(selectUpdateContactAvatar);
  const contactAvatarRef = useRef<HTMLImageElement>(null);
  const { avatar, name, role, _id: id } = contact;

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }

    setContactAvatar(e.target.files);
    onChangeAvatar({ e, ref: contactAvatarRef });
  };

  const handleFormSubmit: SubmitHandler<IAvatar> = (data) => {
    if (!contactAvatar?.length) {
      return;
    }

    data.avatar = contactAvatar;
    const contactFormData = getProfileFormData(data);

    if (!id) return;

    updateContactAvatar({ data: contactFormData, id })
      .then(() => {
        toasts.successToast(Messages.updateAvatar);
        setContactAvatar(null);
      })
      .catch((error) => {
        toasts.errorToast(error);
      });
  };

  const onCancelBtnClick = () => {
    if (contactAvatarRef.current) {
      contactAvatarRef.current.src = avatar as string;
      setContactAvatar(null);
    }
  };

  return (
    <>
      <ImageContainer
        avatar={avatar as string}
        avatarRef={contactAvatarRef}
        updateAvatar={contactAvatar}
        handleFormSubmit={handleFormSubmit}
        onChangeInput={onChangeInput}
        onCancelBtnClick={onCancelBtnClick}
        imgSize="200"
      />
      {editContact ? (
        <EditContactForm {...otherProps} contact={contact} />
      ) : (
        <>
          <ContactTitle>
            <ContactName>{name}</ContactName>
            {role && <ContactDesc>{role}</ContactDesc>}
          </ContactTitle>
          <NavBar>
            <NavList>
              <ListItem>
                <NavLink to={PagePaths.contactPath}>Contact</NavLink>
              </ListItem>
              <ListItem>
                <NavLink to={PagePaths.aboutPath}>About</NavLink>
              </ListItem>
            </NavList>
          </NavBar>
          <Suspense fallback={<Loader />}>
            <Outlet context={contact} />
          </Suspense>
        </>
      )}
    </>
  );
};

export default ContactProfile;
