import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import * as breakpoints from "../../styles/breakpoints";

export const StyledToastContainer = styled(ToastContainer).attrs({
  position: "bottom-left",
})`
    @media (max-width: ${breakpoints.small}) {
      bottom: 0.5rem;
      left: 0.5rem;
      right: 0.5rem;
      width: auto;
    }

  .Toastify__toast {
    background: ${({ theme }) => theme.colors.toast.background};
    color: ${({ theme }) => theme.colors.toast.foreground};
    box-shadow: ${({ theme }) => theme.shadows.small};
    border-radius: 5px;
    min-height: 4rem;
    padding: 0.5rem 2rem;
  }

  .Toastify__toast--error {
    background: ${({ theme }) => theme.colors.error};
  }

  .Toastify__toast--warning {
    
  }
  
  .Toastify__toast--success {
    /* background: ${({ theme }) => theme.colors.success}; */
  }

  .Toastify__toast-body {
    color: ${({ theme }) => theme.colors.toast.foreground};
    font-weight: 500;
  }
  .Toastify__progress-bar {
    background: ${({ theme }) => theme.colors.primary};
    height: 2px;
  }
  .Toastify__close-button {
    display: none;
  }
`;
