import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Message = styled.h1`
  font-size: 1.5em;
  color: palevioletred;

  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;
function NotAuthorized() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate("/login");
    }, 4000);

    return () => clearTimeout(redirectTimeout);
  }, [navigate]);

  return (
    <Message className="notauthorized">
      You are not a authorized user, you will be redirected to the login page.
    </Message>
  );
}

export default NotAuthorized;
