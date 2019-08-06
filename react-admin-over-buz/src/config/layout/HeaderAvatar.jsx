// @flow
import React from 'react';
import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 10em;
  height: 4em;
  text-align: center;
`;

const List = styled.ul`
  background-color: ${({ theme }) => theme.color.bodyBgColor};
  list-style: none;
`;

const ListItem = styled.li``;
const StyledLink = styled(Link)`
  text-decoration: none;
`;

const HeaderAvatar = () => {
  // const [t] = useTranslation('common');
  return (
    <Wrapper>
      <List>
        <ListItem>
          <StyledLink to="/logout">Logout</StyledLink>
        </ListItem>
      </List>
    </Wrapper>
  );
};

export default HeaderAvatar;
