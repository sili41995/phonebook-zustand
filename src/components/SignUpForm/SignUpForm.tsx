import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaUser, FaLock, FaMapMarkerAlt, FaRegCalendarCheck, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { filterEmptyFields, getProfileFormData, onChangeAvatar, toasts } from '@/utils';
import Input from '@/components/Input';
import AuthFormBtn from '@/components/AuthFormBtn';
import AuthFormMessage from '@/components/AuthFormMessage';
import { ISignUpCredentials } from '@/types/types';
import { PagePaths, regExp, FormTypes, IconSizes, InputTypes, Messages } from '@/constants';
import image from '@/images/default-profile-avatar.png';
import { Form, Message, Title, Image } from './SignUpForm.styled';
import { useAuthStore } from '@/zustand/store';
import { selectIsLoading, selectSignUp } from '@/zustand/auth/selectors';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [userAvatar, setUserAvatar] = useState<FileList | null>(null);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ISignUpCredentials>();
  const signInPageLink = `/${PagePaths.signInPath}`;
  const userAvatarRef = useRef<HTMLImageElement>(null);
  const signUp = useAuthStore(selectSignUp);
  const isLoading = useAuthStore(selectIsLoading);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }

    setUserAvatar(e.target.files);
    onChangeAvatar({ e, ref: userAvatarRef });
  };

  const onSubmit: SubmitHandler<ISignUpCredentials> = (data) => {
    if (userAvatar) {
      data.avatar = userAvatar;
    }

    const userData = filterEmptyFields<ISignUpCredentials>(data);
    const userFormData = getProfileFormData(userData);

    signUp(userFormData)
      .then(() => {
        toasts.successToast('User has been successfully registered');
        navigate(signInPageLink);
      })
      .catch((error) => {
        if (error instanceof Error) toasts.errorToast(error.message);
      });
  };

  useEffect(() => {
    errors.name && toasts.errorToast('First name is required');
    errors.email &&
      toasts.errorToast(errors.email.type === 'required' ? Messages.emailReqErr : Messages.emailRegExpErr);
    errors.password &&
      toasts.errorToast(errors.password.type === 'required' ? Messages.passwordReqErr : Messages.passwordMinLengthErr);
    errors.phone && toasts.errorToast(Messages.phoneRegExpErr);
  }, [errors, isSubmitting]);

  return (
    <>
      <Title>sign up</Title>
      <Message>{Messages.greetings}!</Message>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          settings={{ ...register('avatar') }}
          accept="image/png, image/jpeg, image/jpg"
          onChange={onChangeInput}
          type={InputTypes.file}
          altElem={<Image src={image} alt="profile avatar" width="150" height="150" ref={userAvatarRef} />}
        />
        <Input
          settings={{ ...register('name', { required: true }) }}
          type={InputTypes.text}
          placeholder="First name"
          icon={<FaUser size={IconSizes.secondaryIconSize} />}
          formType={FormTypes.authForm}
          inputWrap
          autoFocus
        />
        <Input
          settings={{ ...register('lastName') }}
          type={InputTypes.text}
          placeholder="Last name"
          icon={<FaUser size={IconSizes.secondaryIconSize} />}
          formType={FormTypes.authForm}
          inputWrap
        />

        <Input
          settings={{ ...register('phone', { pattern: regExp.phoneRegEx }) }}
          type={InputTypes.text}
          placeholder="Phone"
          icon={<FaPhoneAlt size={IconSizes.secondaryIconSize} />}
          formType={FormTypes.authForm}
          inputWrap
        />
        <Input
          settings={{
            ...register('email', {
              required: true,
              pattern: regExp.emailRegEx,
            }),
          }}
          type={InputTypes.email}
          placeholder="Email"
          icon={<FaEnvelope size={IconSizes.secondaryIconSize} />}
          formType={FormTypes.authForm}
          inputWrap
        />
        <Input
          settings={{
            ...register('password', { required: true, minLength: 6 }),
          }}
          type={InputTypes.text}
          placeholder="Password"
          icon={<FaLock size={IconSizes.secondaryIconSize} />}
          formType={FormTypes.authForm}
          inputWrap
        />
        <Input
          settings={{ ...register('location') }}
          type={InputTypes.text}
          placeholder="Location"
          icon={<FaMapMarkerAlt size={IconSizes.secondaryIconSize} />}
          formType={FormTypes.authForm}
          inputWrap
        />
        <Input
          settings={{
            ...register('dateOfBirth'),
          }}
          type={InputTypes.date}
          placeholder="Date of birth"
          icon={<FaRegCalendarCheck size={IconSizes.secondaryIconSize} />}
          formType={FormTypes.authForm}
          inputWrap
        />
        <AuthFormMessage action="Sign in" pageLink={signInPageLink} message="if you have an account" />
        <AuthFormBtn title="Enlist" disabled={isLoading} />
      </Form>
    </>
  );
};

export default SignUpForm;
