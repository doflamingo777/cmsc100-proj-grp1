import { useNavigate } from "react-router-dom";

export default function useCustomNavigate() {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1); // go back
  };

  return navigateBack;
}
