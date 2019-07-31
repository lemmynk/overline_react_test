// @flow
import React, { useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  isOpen: boolean,
  match: any,
  onDismiss: () => void,
};

const SidebarWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 360px;
  background-color: white;
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

const StyledLink = styled(Link)`
  font-weight: ${props => (props.isActive ? 'bold' : 'inherit')};
`;

const AppSidebar = (props: Props) => {
  const { isOpen, onDismiss, match } = props;
  const { url: activeUrl } = match;

  const handleOnLinkClick = useCallback(() => {
    if (onDismiss) {
      onDismiss();
    }
  }, []);

  return (
    <>
      <SidebarWrapper isOpen={isOpen}>
        <div>...app sidebar...</div>
        <button onClick={onDismiss} type="submit">
          ...dismiss...
        </button>
        <ul>
          <li>
            <StyledLink
              to="/"
              onClick={handleOnLinkClick}
              isActive={activeUrl === '/'}
            >
              Home
            </StyledLink>
          </li>
          <li>
            <StyledLink
              to="/second"
              onClick={handleOnLinkClick}
              isActive={activeUrl === '/second'}
            >
              Second
            </StyledLink>
          </li>
          <li>
            <StyledLink
              to="/another"
              onClick={handleOnLinkClick}
              isActive={activeUrl === '/another'}
            >
              Another
            </StyledLink>
          </li>
        </ul>
        <pre>{JSON.stringify({ match }, null, 2)}</pre>
      </SidebarWrapper>
    </>
  );
};

export default withRouter(AppSidebar);
