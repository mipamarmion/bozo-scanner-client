import axios from 'axios';
import { validateCookies } from '../utils/cookies';

export async function authenticatePage(context) {
  const headers = validateCookies(context);

  if(!headers) return {redirect: {destination: '/'}};

  try {
    const {data: user} = await axios.get(`${process.env.API_URL}/auth`, {
      headers
    });

    return {props: {user}};
  } catch (err) {
    return {redirect: {destination: '/'}};
  }
}
