import { RegisterFormData } from "./pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormData) => {
  console.log(formData,"client1");
  
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials:"include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  console.log(response,"client2");
  
  const responseBody = await response.json();
  console.log(responseBody,"client3");
  
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};
