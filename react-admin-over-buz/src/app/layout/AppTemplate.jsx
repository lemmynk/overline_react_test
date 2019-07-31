// @flow
import React, { type Node, useState } from 'react';
import styled from 'styled-components';
import GlobalStyle from '../GlobalStyle';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import AppSidebar from './AppSidebar';

type Props = {
  routes: Node,
  renderHeader?: () => Node,
  renderFooter?: () => Node,
  renderSidebar?: () => Node,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.header`
  background-color: lightblue;
`;
const StyledMain = styled.main`
  flex: 1;
  background-color: yellow;
  overflow-y: auto;
`;
const StyledFooter = styled.footer`
  background-color: gray;
  padding-bottom: 2px;
  height: 3.5em;
`;

const AppTemplate = (props: Props) => {
  const {
    routes: AppRouter,
    renderHeader,
    renderFooter,
    renderSidebar,
  } = props;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Wrapper className="fullSize">
      {renderHeader && renderHeader()}
      {!renderHeader && (
        <StyledHeader>
          <AppHeader openSidebar={() => setIsSidebarOpen(true)} />
        </StyledHeader>
      )}
      <StyledMain>
        <AppRouter />
      </StyledMain>
      {renderFooter && renderFooter()}
      {!renderFooter && (
        <StyledFooter>
          <AppFooter />
        </StyledFooter>
      )}
      {renderSidebar && renderSidebar()}
      {!renderSidebar && (
        <AppSidebar
          isOpen={isSidebarOpen}
          onDismiss={() => setIsSidebarOpen(false)}
        />
      )}
      <GlobalStyle />
    </Wrapper>
  );
};

AppTemplate.defaultProps = {
  renderHeader: undefined,
  renderFooter: undefined,
  renderSidebar: undefined,
};

export default AppTemplate;
