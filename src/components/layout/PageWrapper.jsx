// components/layout/PageWrapper.jsx
import styled from 'styled-components';

const WrapperContainer = styled.div`
    min-height: 100vh;
    background: linear-gradient(135deg, 
        #ffecd2 0%, 
        #fcb69f 50%, 
        #ff9a9e 100%
    );
    background-attachment: fixed;
    
    /* 헤더 위쪽까지 배경 적용 */
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