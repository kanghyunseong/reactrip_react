import styled, { css } from 'styled-components';

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* gap을 제거하고 전체를 감싸는 컨테이너로 변경 */
    /* margin-top: 40px; (필요 시 주석 해제) */
    /* border 및 background-color 제거 */
    border-radius: 8px; /* 둥근 모서리 */
    overflow: hidden; /* 내부 요소가 테두리를 넘지 않도록 */
`;

export const PageButton = styled.button`
    min-width: 40px;
    height: 40px;
    border: none; /* 개별 버튼의 테두리 제거 */
    background-color: transparent; /* 배경 투명하게 */
    color: #f5f7f8;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    opacity: ${props => props.disabled ? '0.5' : '1'};
    transition: all 0.2s ease;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px; /* 텍스트 버튼을 위한 패딩 */

    &:hover:not(:disabled) {
        /* 호버 시 배경색 제거 (원하는 경우 주석 해제하여 추가) */
        /* background-color: #e9ecef; */
    }

    i {
        font-size: 14px;
    }

    /* 활성(Active) 상태 스타일: 이 부분만 배경색 유지 */
    ${props => props.$active && css`
        background-color: #646262; /* 이미지 속 활성 버튼의 어두운 배경색 */
        color: white;
        font-weight: 600;
        border-radius: 6px; /* 활성 버튼만 둥글게 */
        margin: 0 4px; /* 활성 버튼 양 옆에 여백 추가하여 구분 */
        
        &:hover:not(:disabled) {
            background-color: #333; /* 호버 시 색상 유지 */
        }
    `}

    /* 텍스트 버튼 (이전/다음) 스타일 */
    ${props => props.$textButton && css`
        font-weight: 500;
        /* 텍스트 버튼 호버 시 배경색 제거 (원하는 경우 주석 해제하여 추가) */
        &:hover:not(:disabled) {
            /* background-color: #e9ecef; */
        }
    `}
`;
