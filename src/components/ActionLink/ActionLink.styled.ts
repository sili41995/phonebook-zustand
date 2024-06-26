import styled from '@emotion/styled';
import { setButtonColor, setIconFill } from '@/utils';
import { IStyledProps } from './ActionLink.types';

export const Link = styled.a<IStyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 36px;
  background-color: ${({ btnType }) => setButtonColor(btnType)};
  border-radius: ${({ theme }) => `${theme.borderRadius.secondaryBorderRadius}px`};
  transition: box-shadow ${({ theme }) => theme.transitionDurationAndFunc};
  &:hover,
  &:focus {
    box-shadow: ${({ theme }) => theme.shadows.primaryShadow};
  }
  & svg {
    color: ${({ btnType }) => setIconFill(btnType)};
  }
`;
