import { MenuProps, Typography } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useAppDispatch } from "../../../app-redux/hooks";

export const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <>
        Signed as{" "}
        <Typography.Text className="signed-user">
          Muhammad Wasim
        </Typography.Text>
      </>
    ),
  },
  {
    key: "2",
    label: <Link to="/create">Craete Gist</Link>,
  },
  {
    key: "3",
    label: <Link to="/my-gists">My Gists</Link>,
  },
  {
    key: "5",
    label: <a href="https://github.com/wasiimakram">Github Profile</a>,
  },
  {
    key: "6",
    label: <SignOutLink />,
  },
];

function SignOutLink() {
  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };
  return (
    <a href="#" onClick={handleSignOut}>
      Sign Out
    </a>
  );
}
