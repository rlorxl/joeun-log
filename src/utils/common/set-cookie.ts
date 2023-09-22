const setCookie = (value: string) => {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + 7);
  let cookieValue = value;
  document.cookie = `theme=${cookieValue};Path=/;`;
};

export default setCookie;
