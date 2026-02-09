// SchedulePage.styles.js
import styled from 'styled-components';

// SchedulePage.styles.js
export const ScheduleContainer = styled.div`
    min-height: 100vh;
    padding: 40px 20px;
    margin-top: 120px;
    
`;

export const ContentWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    
    /* 반투명 흰색 배경 (옵션) */
    background: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    padding: 30px;
    backdrop-filter: blur(10px);  /* 블러 효과 */
    
    @media (max-width: 768px) {
        padding: 15px;
        background: rgba(255, 255, 255, 0.9);
    }
`;

export const PageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 16px;
        align-items: stretch;
    }
`;

export const PageTitle = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    color: #2c3e50;
    margin: 0;
`;

export const CreateButton = styled.button`
    padding: 12px 24px;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
    white-space: nowrap;

    &:hover {
        background-color: #357abd;
    }
`;

export const SearchForm = styled.form`
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
`;

export const SearchInput = styled.input`
    flex: 1;
    padding: 12px 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    
    &:focus {
        outline: none;
        border-color: #4a90e2;
    }
`;

export const SearchButton = styled.button`
    padding: 12px 24px;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
        background-color: #357abd;
    }
`;

export const ScheduleGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    margin-bottom: 40px;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const ScheduleCard = styled.div`
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`;

export const CardHeader = styled.div`
    margin-bottom: 16px;
`;

export const ScheduleTitle = styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0;
    word-break: break-word;
`;

export const CardBody = styled.div`
    margin-bottom: 16px;
`;

export const InfoRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
`;

export const InfoIcon = styled.span`
    font-size: 1.1rem;
`;

export const InfoText = styled.span`
    color: #555;
    font-size: 0.95rem;
`;

export const Description = styled.p`
    color: #666;
    font-size: 0.9rem;
    line-height: 1.5;
    margin-top: 12px;
    word-break: break-word;
`;

export const CardFooter = styled.div`
    padding-top: 16px;
    border-top: 1px solid #eee;
`;

export const CreatedDate = styled.div`
    color: #999;
    font-size: 0.85rem;
`;

export const EmptyMessage = styled.div`
    text-align: center;
    padding: 60px 20px;
    
    p {
        color: #666;
        font-size: 1.1rem;
        margin-bottom: 20px;
    }
`;

export const Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 40px;
    flex-wrap: wrap;
`;

export const PageButton = styled.button`
    padding: 8px 16px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;

    &:hover:not(:disabled) {
        background-color: #f5f5f5;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const PageNumber = styled.button`
    padding: 8px 12px;
    background-color: ${props => props.active ? '#4a90e2' : 'white'};
    color: ${props => props.active ? 'white' : '#333'};
    border: 1px solid ${props => props.active ? '#4a90e2' : '#ddd'};
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: ${props => props.active ? '600' : '400'};
    min-width: 36px;

    &:hover {
        background-color: ${props => props.active ? '#357abd' : '#f5f5f5'};
    }
`;

export const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    font-size: 1.2rem;
    color: #666;
`;

export const ErrorContainer = styled.div`
    text-align: center;
    padding: 60px 20px;
    color: #e74c3c;
    font-size: 1.1rem;
`;

// Form 스타일
export const Form = styled.form`
    background: white;
    border-radius: 12px;
    padding: 32px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    
    @media (max-width: 768px) {
        padding: 20px;
    }
`;

export const FormGroup = styled.div`
    margin-bottom: 24px;
`;

export const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #2c3e50;
    font-size: 0.95rem;
`;

export const Input = styled.input`
    width: 100%;
    padding: 12px 16px;
    border: 1px solid ${props => props.error ? '#e74c3c' : '#ddd'};
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: ${props => props.error ? '#e74c3c' : '#4a90e2'};
    }
`;

export const Textarea = styled.textarea`
    width: 100%;
    padding: 12px 16px;
    border: 1px solid ${props => props.error ? '#e74c3c' : '#ddd'};
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    resize: vertical;
    transition: border-color 0.3s;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: ${props => props.error ? '#e74c3c' : '#4a90e2'};
    }
`;

export const ErrorText = styled.span`
    color: #e74c3c;
    font-size: 0.85rem;
    margin-top: 4px;
    display: block;
`;

export const DateGroup = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 32px;
    
    @media (max-width: 768px) {
        flex-direction: column-reverse;
    }
`;

export const SubmitButton = styled.button`
    padding: 12px 32px;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background-color: #357abd;
    }
`;

export const CancelButton = styled.button`
    padding: 12px 32px;
    background-color: #95a5a6;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background-color: #7f8c8d;
    }
`;

// Detail 스타일
export const DetailHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 16px;
        align-items: stretch;
    }
`;

export const DetailContent = styled.div`
    background: white;
    border-radius: 12px;
    padding: 32px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 24px;
    
    @media (max-width: 768px) {
        padding: 20px;
    }
`;

export const DetailSection = styled.div`
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid #eee;

    &:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
    }
`;

export const DetailLabel = styled.div`
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 8px;
    font-size: 1.05rem;
`;

export const DetailValue = styled.div`
    color: #555;
    font-size: 1rem;
`;

export const DetailDescription = styled.p`
    color: #555;
    font-size: 1rem;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-word;
    margin: 0;
`;

export const EditButton = styled.button`
    padding: 10px 20px;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background-color: #357abd;
    }
`;

export const DeleteButton = styled.button`
    padding: 10px 20px;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background-color: #c0392b;
    }
`;

export const BackButton = styled.button`
    padding: 12px 24px;
    background-color: #95a5a6;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background-color: #7f8c8d;
    }
`;