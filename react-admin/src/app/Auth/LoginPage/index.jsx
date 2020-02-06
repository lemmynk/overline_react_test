// @flow

type Props = {
  url: string,
};

const LoginPage = (props: Props) => {
  const { url } = props;

  window.location = url;
  return null;
};

export default LoginPage;
