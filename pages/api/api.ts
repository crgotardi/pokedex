// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});