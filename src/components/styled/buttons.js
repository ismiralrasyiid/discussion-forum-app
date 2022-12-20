import styled from 'styled-components';

const Button = styled.button`
  font-family: var(--main-font);
  text-decoration: none;
  cursor: pointer;
  border: none;
  letter-spacing: 1px;
  background-color: var(--dark-bg);
  color: white;
  transition: .25s;
`;

const NavButton = styled(Button)`
  padding: 5px;
  &:hover {
    transform: scale(1.05);
  }
`;

const NewThreadButton = styled(Button)`
  padding: 5px 10px;
  border-radius: 2px;
  margin-inline: auto !important;
  &:hover {
    transform: scale(1.05);
    text-decoration: underline;
  }
`;

const CommentButton = styled(NewThreadButton)`
  display: block;
`;

const BottomNavButton = styled(Button)`
  padding: 8px;
  display: flex;
  align-items: center;
  border-radius: 3px;
  > svg {
    margin-right: 4px;
  }
`;

const ToTopButton = styled(Button)`
  padding: 7px;
  font-size: 1.3em;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 3px;
`;

const LoginRegisterButton = styled(Button)`
  border: none;
  padding: 7px 10px;
  border-radius: 3px;
  margin: 10px auto;
  transition: .2s;
  &:hover {
    transform: scale(1.07);
  }
`;

export {
  Button,
  NavButton,
  NewThreadButton,
  CommentButton,
  BottomNavButton,
  ToTopButton,
  LoginRegisterButton,
};
