import { ChangeEvent, FC, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { InputTypes } from '@/constants';
import { filterEmptyFields, getIsContact, getProfileFormData, onChangeAvatar, toasts } from '@/utils';
import { IContact } from '@/types/types';
import ModalForm from '@/components/ModalForm';
import Input from '@/components/Input';
import GoBackLink from '@/components/GoBackLink';
import ContactFormInputs from '@/components/ContactFormInputs';
import AcceptBtn from '@/components/AcceptBtn';
import image from '@/images/default-profile-avatar.png';
import { ButtonsList, Item, Form, Title, Image } from './AddContactForm.styled';
import { useContactsStore } from '@/zustand/store';
import { selectAddContact, selectContacts, selectIsLoading } from '@/zustand/contacts/selectors';

const AddContactForm: FC = () => {
  const [contactAvatar, setContactAvatar] = useState<FileList | null>(null);
  const contacts = useContactsStore(selectContacts);
  const addContact = useContactsStore(selectAddContact);
  const contactAvatarRef = useRef<HTMLImageElement>(null);
  const isLoading = useContactsStore(selectIsLoading);
  const [checked, setChecked] = useState<boolean>(false);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<IContact>();

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }

    setContactAvatar(e.target.files);
    onChangeAvatar({ e, ref: contactAvatarRef });
  };

  const handleFormSubmit: SubmitHandler<IContact> = (data) => {
    const newContactName = data.name;
    const isContact = getIsContact({ newContactName, contacts: contacts! });

    if (isContact) {
      toasts.warnToast(`${newContactName} is already in contacts`);
      return;
    }

    if (contactAvatar) {
      data.avatar = contactAvatar;
    }

    const contactData = filterEmptyFields<IContact>(data);
    const contactFormData = getProfileFormData(contactData);
    console.log(contactFormData);

    addContact(contactFormData)
      .then(() => {
        toasts.successToast('Contact added successfully');

        if (contactAvatarRef.current) {
          contactAvatarRef.current.src = image;
        }

        reset();
      })
      .catch((error) => {
        toasts.errorToast(error);
      });
  };

  const onCheckboxChange = () => {
    setChecked((prevState) => !prevState);
  };

  return (
    <ModalForm>
      <Title>Add contact</Title>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Input
          settings={{ ...register('avatar') }}
          accept="image/png, image/jpeg, image/jpg"
          onChange={onChangeFile}
          type={InputTypes.file}
          altElem={<Image src={image} alt="profile avatar" width="150" height="150" ref={contactAvatarRef} />}
        />
        <ContactFormInputs
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          onCheckboxChange={onCheckboxChange}
          checked={checked}
        />
        <ButtonsList>
          <Item>
            <AcceptBtn disabled={isLoading} />
          </Item>
          <Item>
            <GoBackLink />
          </Item>
        </ButtonsList>
      </Form>
    </ModalForm>
  );
};

export default AddContactForm;
