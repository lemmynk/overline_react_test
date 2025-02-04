// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HOME } from '../appRoutes';

const Wrapper = styled.div`
  height: 100%;
  display: flex:
  flex-direction: row;
  align-items: center;
  margin-left: ${({ theme }) => theme.size.gutter};
`;

const StyledImg = styled.img`
  height: calc(${({ theme }) => theme.size.headerHeight} - 1rem);
`;

const NavBrand = () => (
  <Wrapper>
    <Link to={HOME.url}>
      <StyledImg src="/assets/icons/overline-brand.svg" alt="OVERline" />
    </Link>
  </Wrapper>
);

export default NavBrand;
