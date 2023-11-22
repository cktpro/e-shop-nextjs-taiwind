import axios from "axios";

export async function refreshAccessToken(refreshToken) {
  // Send the refresh token to the backend to get a new access token
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_USER}/authCustomers/check-refreshtoken`, {
      refreshToken,
    });

    const { token } = res.data;

    return token;
  } catch (error) {
    return "Token refresh failed";
  }
}
