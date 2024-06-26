import { FC } from 'react';
import IconButton from '@/components/IconButton';
import { IProps } from './Input.types';
import { Positions, InputTypes } from '@/constants';
import { Container, Label, StyledInput } from './Input.styled';

const Input: FC<IProps> = ({
  settings,
  inputWrap,
  action,
  btnIcon,
  btnType,
  type,
  icon,
  altElem,
  checked,
  ...otherProps
}) => {
  const input = <StyledInput type={type} checked={checked} {...settings} {...otherProps} />;

  if (type === InputTypes.file || type === InputTypes.checkbox) {
    return (
      <Label checked={checked}>
        {altElem}
        {input}
      </Label>
    );
  }

  const inputWithWrap = (
    <Container>
      {input}
      {icon}
      {btnType && (
        <IconButton
          onBtnClick={action}
          btnType={btnType}
          position={Positions.absolute}
          top="center"
          icon={btnIcon}
          height={36}
          inputWrap
        />
      )}
    </Container>
  );

  return inputWrap ? inputWithWrap : input;
};

export default Input;
