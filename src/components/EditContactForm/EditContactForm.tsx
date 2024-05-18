import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { IContact } from '@/types/types';
import { IProps } from './EditContactForm.types';
import IconButton from '@/components/IconButton';
import ContactFormInputs from '@/components/ContactFormInputs';
import ModalForm from '@/components/ModalForm';
import AcceptBtn from '@/components/AcceptBtn';
import { AriaLabels, IconBtnType, IconSizes, PagePaths } from '@/constants';
import { ButtonsList, Item, Form, Title } from './EditContactForm.styled';
import { useParams } from 'react-router-dom';
import { useContactsStore } from '@/zustand/store';
import { selectIsLoading, selectUpdateContact } from '@/zustand/contacts/selectors';
import { toasts } from '@/utils';

const EditContactForm = ({ onEditBtnClick, setContact, contact, ...otherProps }: IProps) => {
  const [checked, setChecked] = useState<boolean>(() => contact.favorite as boolean);
  const isLoading = useContactsStore(selectIsLoading);
  const updateContact = useContactsStore(selectUpdateContact);

  const id = useParams()[PagePaths.dynamicParam] as string;
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<IContact>();

  const handleFormSubmit: SubmitHandler<IContact> = (data) => {
    updateContact({ data, id })
      .then((data) => {
        if (!data) {
          return;
        }

        toasts.successToast('Contact updated successfully');
        setContact(data);
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
      <Title>Contact editing</Title>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <ContactFormInputs
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          contact={contact}
          onCheckboxChange={onCheckboxChange}
          checked={checked}
          {...otherProps}
        />
        <ButtonsList>
          <Item>
            <AcceptBtn disabled={isLoading} />
          </Item>
          <Item>
            <IconButton
              btnType={IconBtnType.cancel}
              onBtnClick={onEditBtnClick}
              aria-label={AriaLabels.cancel}
              icon={<FaTimes size={IconSizes.primaryIconSize} />}
            />
          </Item>
        </ButtonsList>
      </Form>
    </ModalForm>
  );
};

export default EditContactForm;
