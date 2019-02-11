export default function cookieParser(req, res, next) {
  const { cookie } = req.headers;

  if (cookie) {
    const pairs = cookie.split('; ');

    req.parsedCookies = pairs.reduce((acc, current) => {
      const [key, value] = current.split('=');

      acc[key] = value;

      return acc;
    }, {});
  }

  next();
}
