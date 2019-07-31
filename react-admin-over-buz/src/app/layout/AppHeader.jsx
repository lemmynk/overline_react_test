// @flow
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  match: ReactRouterMatch,
  openSidebar: () => void,
};

const Wrapper = styled.div`
  position: relative;
`;

const Navigation = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const StyledLink = styled(Link)`
  padding: 2em;
  font-weight: ${props => (props.isActive ? 'bold' : 'inherit')};
`;

const AppHeader = (props: Props) => {
  const { openSidebar, match } = props;
  const { url: activeUrl } = match;

  return (
    <Wrapper>
      <Navigation>
        <div>
          <button type="submit" onClick={openSidebar}>
            ....
          </button>
        </div>
        <StyledLink to="/" isActive={activeUrl === '/'}>
          home
        </StyledLink>
        <StyledLink to="/second" isActive={activeUrl === '/second'}>
          Second
        </StyledLink>
        <StyledLink to="/another" isActive={activeUrl === '/another'}>
          Another
        </StyledLink>
      </Navigation>
    </Wrapper>
  );
};

export default withRouter(AppHeader);
