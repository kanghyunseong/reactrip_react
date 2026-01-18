import styled from 'styled-components';

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 40px;
`;

export const PageButton = styled.button`
    min-width: 40px;
    height: 40px;
    border: 1px solid ${props => props.$active ? 'var(--accent-color)' : '#dee2e6'};
    background-color: ${props => props.$active ? 'var(--accent-color)' : 'white'};
    color: ${props => props.$active ? 'white' : '#495057'};
    border-radius: 6px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    opacity: ${props => props.disabled ? '0.5' : '1'};
    transition: all 0.2s ease;
    font-weight: ${props => props.$active ? '600' : '400'};
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover:not(:disabled) {
        background-color: ${props => props.$active ? 'var(--accent-color)' : '#e9ecef'};
        border-color: ${props => props.$active ? 'var(--accent-color)' : '#adb5bd'};
    }

    i {
        font-size: 14px;
    }
`;