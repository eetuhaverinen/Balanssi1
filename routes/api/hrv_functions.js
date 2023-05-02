const fetch = require('node-fetch');
const userAgent = 'Test Kubios 0.1';
const User = require('../../models/userModel');


const login = async (email, password) => {
  const cookie = 'keyboardCatRandom';
  const myHeaders = {Cookie: `XSRF-TOKEN=${cookie}`, 'User-Agent': userAgent};
  const myBody = new URLSearchParams();
  myBody.set('client_id', '74571pdhuc7vvak4tl45uts8u8');
  myBody.set('redirect_uri', 'https://analysis.kubioscloud.com/v1/portal/login');
  myBody.set('username', email);
  myBody.set('password', password);
  myBody.set('response_type', 'token');
  myBody.set('access_type', 'openid');
  myBody.set('_csrf', cookie);
  const option = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'manual',
    body: myBody,
  };
  const response = await fetch('https://kubioscloud.auth.eu-west-1.amazoncognito.com/login', option);
  const location = response.headers.raw().location[0];
  const token = location.substring(location.indexOf('=') + 1, location.indexOf('&'));
  return token;
};

const perso = async () => {
  const token = await login();
const myHeaders = {Authorization: 'Bearer ' + token, 'User-Agent': userAgent};
  const response = await fetch('https://analysis.kubioscloud.com/v2/user/self', { headers: myHeaders });
  const json = await response.json();
  console.log('json', json);
};

perso();

const gethrvData = async (email,password) => {
  const token = await login(email, password);
  const myHeaders = { Authorization: 'Bearer ' + token, 'User-Agent': userAgent };
  const response = await fetch('https://analysis.kubioscloud.com/v2/result/self?types=readiness&daily=yes&from=2023-01-24T00%3A00%3A00%2B00%3A00&to=2023-03-11T23%3A59%3A59%2B00%3A00', { headers: myHeaders });
  const json = await response.json();
  console.log('json', json);
  return json;
  };
  
  
  module.exports = {
    gethrvData,
  };