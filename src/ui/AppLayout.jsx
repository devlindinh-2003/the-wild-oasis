import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';

const StyledApplayout = styled.div`
  background-color: var(--color-grey-50);
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  overflow: hidden;
`;
const Main = styled.main`
  padding: 4rem 4.8rem 6.4rem;
  height: 100vh;
  overflow: scroll;
`;
const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const AppLayout = () => {
  return (
    <StyledApplayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledApplayout>
  );
};

export default AppLayout;
