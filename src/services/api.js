const BASE_URL = 'https://api.noroff.dev/api/v1';
const REGISTER_URL = `${BASE_URL}/holidaze/auth/register`;
const LOGIN_URL = `${BASE_URL}/holidaze/auth/login`;
const VENUES_URL = `${BASE_URL}/holidaze/venues`;

export const registerUser = async (data) => {
  try {
    const response = await fetch(REGISTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};
