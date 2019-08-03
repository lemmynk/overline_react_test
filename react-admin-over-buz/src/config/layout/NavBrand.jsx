// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HOME } from '../appLinks';

const Wrapper = styled.div`
  height: 100%;
  display: flex:
  flex-direction: row;
  align-items: center;
`;

const StyledImg = styled.img`
  height: calc(${({ theme }) => theme.size.headerHeight} - 1rem);
`;

const NavBrand = () => (
  <Wrapper>
    <Link to={HOME}>
      <StyledImg src="/assets/icons/overline-brand.svg" alt="OVERline" />
    </Link>
  </Wrapper>
);

export default NavBrand;
