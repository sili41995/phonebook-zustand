import { MouseEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillStar, AiOutlineDelete, AiOutlineEdit, AiOutlineStar } from 'react-icons/ai';
import DefaultMessage from '@/components/DefaultMessage';
import ContactProfile from '@/components/ContactProfile';
import GoBackLink from '@/components/GoBackLink';
import IconButton from '@/components/IconButton';
import Loader from '@/components/Loader';
import { AriaLabels, FetchStatuses, IconBtnType, IconSizes, PagePaths } from '@/constants';
import { IContact } from '@/types/types';
import contactsServiceApi from '@/service/contactsServiceApi';
import { makeBlur, toasts } from '@/utils';
import { ButtonsContainer, Container, ButtonsList, Item } from './ContactDetails.styled';
import { useContactsStore } from '@/zustand/store';
import { selectIsLoading, selectUpdateContactStatus } from '@/zustand/contacts/selectors';
import useDeleteContact from '@/hooks/useDeleteContact';

const ContactDetails = () => {
  const deleteContact = useDeleteContact();
  const [contact, setContact] = useState<IContact | null>(null);
  const [editContact, setEditContact] = useState<boolean>(false);
  const [fetchContactStatus, setFetchContactStatus] = useState<FetchStatuses>(() => FetchStatuses.idle);
  const id = useParams()[PagePaths.dynamicParam];
  const isLoading = useContactsStore(selectIsLoading);
  const updateContactStatus = useContactsStore(selectUpdateContactStatus);
  const isLoadingContact = fetchContactStatus === FetchStatuses.pending;
  const isLoadedContact = fetchContactStatus === FetchStatuses.resolved && contact;
  const isFetchError = fetchContactStatus === FetchStatuses.rejected;
  const favoriteBtnIcon = contact?.favorite ? (
    <AiFillStar size={IconSizes.primaryIconSize} />
  ) : (
    <AiOutlineStar size={IconSizes.primaryIconSize} />
  );

  useEffect(() => {
    setEditContact(false);
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();

    const getContact = async (id: string) => {
      setFetchContactStatus(FetchStatuses.pending);
      try {
        const contact = await contactsServiceApi.fetchContactById({
          id,
          signal: controller.signal,
        });
        setContact(contact);
        setFetchContactStatus(FetchStatuses.resolved);
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          toasts.errorToast(error.message);
          setFetchContactStatus(FetchStatuses.rejected);
        }
      }
    };

    id && getContact(id);

    return () => {
      controller.abort();
    };
  }, [id]);

  const onDelBtnClick = () => {
    if (id) {
      deleteContact(id);
    }
  };

  const onEditBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    setEditContact((prevState) => !prevState);
    makeBlur(e.currentTarget);
  };

  const onFavoriteBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    makeBlur(e.currentTarget);

    if (!contact?._id) return;

    const { favorite, _id: id } = contact;
    const data = { favorite: !favorite };
    console.log(data);
    console.log(id);
    updateContactStatus({ data, id })
      .then(() => {
        toasts.successToast('Contact status updated successfully');
        setContact((prevState) => ({ ...prevState, favorite: !prevState?.favorite } as IContact));
      })
      .catch((error) => {
        toasts.errorToast(error);
      });
  };

  const updateContact = (data: IContact): void => {
    setContact(data);
  };

  return isLoadingContact ? (
    <Loader />
  ) : (
    <Container>
      <ButtonsContainer>
        <GoBackLink height={36} />
        {isLoadedContact && (
          <ButtonsList>
            {!editContact && (
              <>
                <Item>
                  <IconButton
                    disabled={isLoading}
                    btnType={IconBtnType.favorite}
                    aria-label={AriaLabels.favorite}
                    onBtnClick={onFavoriteBtnClick}
                    icon={favoriteBtnIcon}
                  />
                </Item>
                <Item>
                  <IconButton
                    disabled={isLoading}
                    btnType={IconBtnType.delete}
                    aria-label={AriaLabels.delete}
                    onBtnClick={onDelBtnClick}
                    icon={<AiOutlineDelete size={IconSizes.primaryIconSize} />}
                  />
                </Item>
              </>
            )}
            <Item>
              <IconButton
                btnType={IconBtnType.edit}
                aria-label={AriaLabels.edit}
                onBtnClick={onEditBtnClick}
                icon={<AiOutlineEdit size={IconSizes.primaryIconSize} />}
              />
            </Item>
          </ButtonsList>
        )}
      </ButtonsContainer>
      {isLoadedContact && (
        <ContactProfile
          contact={contact}
          editContact={editContact}
          onEditBtnClick={onEditBtnClick}
          setContact={updateContact}
        />
      )}
      {isFetchError && <DefaultMessage message="Contact is absent" />}
    </Container>
  );
};

export default ContactDetails;
