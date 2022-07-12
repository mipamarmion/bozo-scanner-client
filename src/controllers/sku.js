import axios from 'axios';
import { validateCookies } from '../utils/cookies';

export const getSku = async (context) => {
  const headers = validateCookies(context);

  if(!headers) return;

  try {
    const {data: user} = await axios.get(`${process.env.API_URL}/auth`, {
      headers
    });

    return {props: {user}};
  } catch (err) {
    return {redirect: {destination: '/'}};
  }
}

export const addSku = async (context) => {
  const headers = validateCookies(context);

  if(!headers) return;

  try {
    const {data: user} = await axios.get(`${process.env.API_URL}/auth`, {
      headers
    });

    return {props: {user}};
  } catch (err) {
    return {redirect: {destination: '/'}};
  }
}

export const updateSku = async (context) => {
  const headers = validateCookies(context);

  if(!headers) return;

  try {
    const {data: user} = await axios.get(`${process.env.API_URL}/auth`, {
      headers
    });

    return {props: {user}};
  } catch (err) {
    return {redirect: {destination: '/'}};
  }
}

export const deleteSku = async (context) => {
  const headers = validateCookies(context);

  if(!headers) return;

  try {
    const {data: user} = await axios.get(`${process.env.API_URL}/auth`, {
      headers
    });

    return {props: {user}};
  } catch (err) {
    return {redirect: {destination: '/'}};
  }
}
