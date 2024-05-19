import { AiFillStar, AiOutlineDelete } from 'react-icons/ai';
import IconButton from '@/components/IconButton';
import LinkWithQuery from '@/components/LinkWithQuery';
import { IProps } from './ContactsListItem.types';
import { AriaLabels, IconSizes, PagePaths, Positions } from '@/constants';
import { IconBtnType } from '@/constants';
import { Email, Image, Item, Role, Name, Phone, ContactInfo, Person, ImageContainer } from './ContactsListItem.styled';
import { useContactsStore } from '@/zustand/store';
import useDeleteContact from '@/hooks/useDeleteContact';
import { selectIsLoading } from '@/zustand/contacts/selectors';

const ContactsListItem = ({ contact }: IProps) => {
  const { avatar, name, id, role, phone, email, favorite } = contact;
  const isLoading = useContactsStore(selectIsLoading);
  const deleteContact = useDeleteContact();
  const contactPath = `${id}/${PagePaths.contactPath}`;

  const handleDelBtnClick = () => {
    id && deleteContact(id);
  };

  return (
    <Item>
      <LinkWithQuery to={contactPath}>
        <ImageContainer>
          <Image src={avatar as string} alt={name} width="70" height="70" />
          {favorite && <AiFillStar size={IconSizes.primaryIconSize} />}
        </ImageContainer>
        <ContactInfo>
          <Person>
            <Name>{name}</Name>
            {role && <Role>{role}</Role>}
          </Person>
          <Phone>{phone}</Phone>
          <Email>{email}</Email>
        </ContactInfo>
      </LinkWithQuery>
      <IconButton
        position={Positions.absolute}
        disabled={isLoading}
        btnType={IconBtnType.deleteTransparent}
        onBtnClick={handleDelBtnClick}
        aria-label={AriaLabels.delete}
        icon={<AiOutlineDelete size={IconSizes.primaryIconSize} />}
        height={36}
      />
    </Item>
  );
};

export default ContactsListItem;
