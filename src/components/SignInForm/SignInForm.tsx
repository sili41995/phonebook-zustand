import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { toasts } from '@/utils';
import AuthFormMessage from '@/components/AuthFormMessage';
import Input from '@/components/Input';
import AuthFormBtn from '@/components/AuthFormBtn';
import { ICredentials } from '@/types/types';
import { Messages, FormTypes, IconBtnType, IconSizes, InputTypes, PagePaths } from '@/constants';
import defaultAvatar from '@/images/default-signin-avatar.png';
import { Form, Message, Title, Image } from './SignInForm.styled';
import { useAuthStore } from '@/zustand/store';
import { selectIsLoading, selectSignIn, selectUser } from '@/zustand/auth/selectors';

const SignInForm = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const isLoading = useAuthStore(selectIsLoading);
  const signIn = useAuthStore(selectSignIn);
  const user = useAuthStore(selectUser);
  const userAvatar = user.avatar ? user.avatar : defaultAvatar;

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
  } = useForm<ICredentials>();
  const passwordInputType = isShowPassword ? InputTypes.text : InputTypes.password;
  const watchPassword = watch('password');
  const passwordBtnIcon =
    Boolean(watchPassword) &&
    (isShowPassword ? <FaEyeSlash size={IconSizes.secondaryIconSize} /> : <FaEye size={IconSizes.secondaryIconSize} />);
  const signUpPageLink = `/${PagePaths.signUpPath}`;
  const greetings = `${Messages.greetings}${user.name ? `, ${user.name}` : ''}!`;

  const toggleIsShowPassword = () => {
    setIsShowPassword((prevState) => !prevState);
  };

  useEffect(() => {
    errors.email &&
      toasts.errorToast(errors.email.type === 'required' ? Messages.emailReqErr : Messages.emailRegExpErr);
    errors.password &&
      toasts.errorToast(errors.password.type === 'required' ? Messages.passwordReqErr : Messages.passwordMinLengthErr);
  }, [isSubmitting, errors]);

  const onSubmit: SubmitHandler<ICredentials> = (data) => {
    signIn(data);
  };

  return (
    <>
      <Title>sign in</Title>
      <Message>{greetings}</Message>
      <Message>greetings</Message>
      <Image src={userAvatar} alt="user avatar" width="150" height="150" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          settings={{ ...register('email', { required: true }) }}
          type={InputTypes.email}
          placeholder="Email"
          icon={<FaEnvelope size={IconSizes.secondaryIconSize} />}
          formType={FormTypes.authForm}
          inputWrap
          autoFocus
        />
        <Input
          settings={{
            ...register('password', { required: true, minLength: 6 }),
          }}
          type={passwordInputType}
          placeholder="Password"
          icon={<FaLock size={IconSizes.secondaryIconSize} />}
          formType={FormTypes.authForm}
          inputWrap
          btnType={IconBtnType.toggleShowPassword}
          btnIcon={passwordBtnIcon}
          action={toggleIsShowPassword}
        />
        <AuthFormMessage action="Sign up" pageLink={signUpPageLink} message="if you don't have an account yet" />
        <AuthFormBtn title="Sign in" disabled={isLoading} />
      </Form>
    </>
  );
};

export default SignInForm;
