import styled from 'styled-components'

export const Availability = styled.p`
  font-size: 14px;
  padding: 4px 12px;
  border-radius: 16px;
  font-weight: 500;
  text-align:center;
  align-self:center:
  color: ${props => (props.status === 'Available Today' ? '#0f5132' : '#842029')};
  background-color: ${props =>
    props.status === 'Available Today' ? '#d1e7dd' : '#f8d7da'};
`

export const DisabledButton = styled.button`
  display: inline-block;
  padding: 8px 16px;
  background-color: #ccc;
  color: #666;
  border: none;
  border-radius: 4px;
  cursor: not-allowed;
  pointer-events: none;
  font-weight: 600;
  font-size: 14px;
`
