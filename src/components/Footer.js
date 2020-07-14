import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../assets/nih-white-logo.png';

const FooterStyled = styled.footer`
  background-color: var(--footer-bkgd);
`;

const FooterContainer = styled(Container)`
  max-width: 80rem;
  color: var(--white);
`;

const Menu = styled.div`
  padding: 2rem 0;
`;

const Logo = styled.img`
  max-width: 15rem;
`;

const Title = styled.h5`
  font-size: 0.6875rem;
`;

const MenuLink = styled.a`
  font-size: 0.625rem;
  color: var(--white);
`;

const MenuUl = styled.ul`
  padding-left: 0;
  list-style: none;
`;

const MenuLi = styled.li`
  line-height: 1.3;
`;

const Hr = styled.hr`
  border-top: 1px solid #98D2FF;
  width: 95%;
`;

const Caption = styled.div`
  font-size: 0.6875rem;
  padding: 0.3125rem 0;
  text-align: center;

  && a {
    color: var(--white);
    font-size: 0.625rem;
    margin: 0 0.5rem;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding: 0.625rem 0;

  && a {
    color: var(--white);
    font-size: 0.75rem;
  }
`;


const Footer = () => {
  return (
    <FooterStyled >
      <FooterContainer>
        <Menu>
          <Row>
            <Col xs={5}>
              <Logo src={logo} alt="logo-footer" />
            </Col>
            <Col xs={7}>
              <Row>
                <Col xs={3}>
                  <Title>About ICDC</Title>
                  <MenuUl>
                    <MenuLi><MenuLink href>Steering Committee</MenuLink></MenuLi>
                    <MenuLi><MenuLink href>Policies</MenuLink></MenuLi>
                    <MenuLi><MenuLink href>FAQs</MenuLink></MenuLi>
                    <MenuLi><MenuLink href>Contact Us</MenuLink></MenuLi>
                  </MenuUl>
                </Col>
                <Col xs={3}>
                  <Title>About the Data</Title>
                  <MenuUl>
                    <MenuLi><MenuLink href>Data Access Policies</MenuLink></MenuLi>
                    <MenuLi><MenuLink href>Data Analysis</MenuLink></MenuLi>
                    <MenuLi><MenuLink href>REST APIs</MenuLink></MenuLi>
                  </MenuUl>
                </Col>
                <Col xs={3}>
                  <Title>About Data Submission</Title>
                  <MenuUl>
                    <MenuLi><MenuLink href>Data Governance Advisory Board</MenuLink></MenuLi>
                    <MenuLi><MenuLink href>Process and Tools</MenuLink></MenuLi>
                    <MenuLi><MenuLink href>Submission Guide</MenuLink></MenuLi>
                  </MenuUl>
                </Col>
                <Col xs={3}>
                  <Title>NIH Policies</Title>
                  <MenuUl>
                    <MenuLi><MenuLink href>Disclaimer Policies</MenuLink></MenuLi>
                    <MenuLi><MenuLink href>Accessibility</MenuLink></MenuLi>
                    <MenuLi><MenuLink href>FOIA</MenuLink></MenuLi>
                  </MenuUl>
                </Col>
              </Row>
            </Col>
          </Row>
        </Menu>
        <Hr />
        <Row>
          <Col xs={12}> 
            <Caption>
              <a href>U.S. Department of Health and Human Services</a><span>|</span>
              <a href>National Institutes of Health</a><span>|</span>
              <a href>National Cancer Institute</a><span>|</span>
              <a href>USA.gov</a>
            </Caption>
            <Copyright>
              <a href>NIH … Turning Discovery Into Health®</a>
            </Copyright>
          </Col>
        </Row>
      </FooterContainer>
    </FooterStyled>
  );
}

export default Footer;