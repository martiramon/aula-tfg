import styled from 'styled-components'

export const Button = styled.button`
    width: ${(props) => (props.width ? props.width : 'auto')};
    border: 0;
    padding: 8px 16px;
    border-radius: 4px;
    background-color: #3f51b5;
    font-size: 0.9rem;
    font-weight: 500;
    color: #ffffff;
    line-height: 1.5;
    letter-spacing: 0.03rem;
    cursor: pointer;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`
