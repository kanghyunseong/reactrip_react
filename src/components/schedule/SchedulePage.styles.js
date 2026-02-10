// SchedulePage.styles.js
import styled from 'styled-components';

// SchedulePage.styles.js
export const ScheduleContainer = styled.div`
    min-height: 100vh;
    padding: 40px 20px;
    margin-top: 120px;
    
`;

export const ContentWrapper = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    background: #fff;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(0, 0, 0, 0.04);

    @media (max-width: 768px) {
        padding: 1.25rem;
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
    font-size: 1.5rem;
    font-weight: 700;
    color: #2c2c2c;
    margin: 0;
    letter-spacing: -0.02em;
`;

export const CreateButton = styled.button`
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #c17f59 0%, #a86a47 100%);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    white-space: nowrap;
    box-shadow: 0 4px 14px rgba(193, 127, 89, 0.35);

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 18px rgba(193, 127, 89, 0.4);
    }
`;

export const SearchForm = styled.form`
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
`;

export const SearchInput = styled.input`
    flex: 1;
    padding: 0.75rem 1rem;
    border: 1px solid #e8e4df;
    border-radius: 10px;
    font-size: 1rem;

    &:focus {
        outline: none;
        border-color: #c17f59;
        box-shadow: 0 0 0 3px rgba(193, 127, 89, 0.12);
    }
`;

export const SearchButton = styled.button`
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #c17f59 0%, #a86a47 100%);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(193, 127, 89, 0.35);
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
    background: #fff;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(0, 0, 0, 0.04);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }
`;

export const CardHeader = styled.div`
    margin-bottom: 1rem;
`;

export const ScheduleTitle = styled.h3`
    font-size: 1.15rem;
    font-weight: 600;
    color: #2c2c2c;
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
    padding: 0.5rem 1rem;
    background: ${(p) => (p.disabled ? "#f0ebe3" : "#fff")};
    border: 1px solid #e0dcd6;
    border-radius: 10px;
    cursor: pointer;
    font-size: 0.9rem;
    color: #555;

    &:hover:not(:disabled) {
        background: #faf8f5;
        border-color: #c17f59;
        color: #a86a47;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const PageNumber = styled.button`
    padding: 0.5rem 0.75rem;
    background: ${(p) => (p.$active ? "#c17f59" : "#fff")};
    color: ${(p) => (p.$active ? "#fff" : "#555")};
    border: 1px solid ${(p) => (p.$active ? "#c17f59" : "#e0dcd6")};
    border-radius: 10px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: ${(p) => (p.$active ? "600" : "500")};
    min-width: 36px;
    transition: all 0.2s;

    &:hover {
        background: ${(p) => (p.$active ? "#a86a47" : "#faf8f5")};
        border-color: #c17f59;
        color: ${(p) => (p.$active ? "#fff" : "#a86a47")};
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
    padding: 0.75rem 1rem;
    border: 1px solid ${(p) => (p.error ? "#e74c3c" : "#e8e4df")};
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: ${(p) => (p.error ? "#e74c3c" : "#c17f59")};
        box-shadow: 0 0 0 3px rgba(193, 127, 89, 0.12);
    }
`;

export const Textarea = styled.textarea`
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid ${(p) => (p.error ? "#e74c3c" : "#e8e4df")};
    border-radius: 10px;
    font-size: 1rem;
    font-family: inherit;
    resize: vertical;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: ${(p) => (p.error ? "#e74c3c" : "#c17f59")};
        box-shadow: 0 0 0 3px rgba(193, 127, 89, 0.12);
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
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #c17f59 0%, #a86a47 100%);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 14px rgba(193, 127, 89, 0.35);
    }
`;

export const CancelButton = styled.button`
    padding: 0.75rem 1.5rem;
    background: #fff;
    color: #555;
    border: 1px solid #e0dcd6;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;

    &:hover {
        background: #faf8f5;
        border-color: #c17f59;
        color: #a86a47;
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
    padding: 0.6rem 1.25rem;
    background: linear-gradient(135deg, #c17f59 0%, #a86a47 100%);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(193, 127, 89, 0.35);
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
    padding: 0.6rem 1.25rem;
    background: #fff;
    color: #555;
    border: 1px solid #e0dcd6;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;

    &:hover {
        background: #faf8f5;
        border-color: #c17f59;
        color: #a86a47;
    }
`;