import { NavLink } from 'react-router-dom';
import PrivateLinks from '@/components/PrivateLinks';
import PublicLinks from '@/components/PublicLinks';
import { PagePaths } from '@/constants';
import { NavContainer, List, ListItem } from './NavigationBar.styled';
import { useAuthStore } from '@/zustand/store';
import { selectIsLoggedIn } from '@/zustand/auth/selectors';

const NavigationBar = () => {
  const isLoggedIn = useAuthStore(selectIsLoggedIn);
  const contactsPagePath = `/${PagePaths.contactsPath}`;
  const aboutPagePath = `/${PagePaths.aboutPath}`;

  return (
    <NavContainer>
      <List>
        <ListItem>
          <NavLink to={contactsPagePath}>Contacts</NavLink>
        </ListItem>
        <ListItem>
          <NavLink to={aboutPagePath}>About</NavLink>
        </ListItem>
      </List>
      {isLoggedIn ? <PrivateLinks /> : <PublicLinks />}
    </NavContainer>
  );
};

export default NavigationBar;
