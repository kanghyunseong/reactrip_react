// components/layout/PageWrapper.jsx
import styled from 'styled-components';

const WrapperContainer = styled.div`
    min-height: 100vh;
    background: linear-gradient(160deg, #faf8f5 0%, #f0ebe3 100%);
    background-attachment: fixed;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
`;

const PageWrapper = ({ children }) => {
    return <WrapperContainer>{children}</WrapperContainer>;
};

export default PageWrapper;