import { Typography } from "antd";
import type { MenuProps } from "antd";

export const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <>
        Signed as <Typography.Text>Johan Doe</Typography.Text>
      </>
    ),
  },
  {
    key: "2",
    label: "Craete Gist",
  },
  {
    key: "3",
    label: "Your Gists",
  },
  {
    key: "4",
    label: <a href="https://www.luohanacademy.com">Stared Gists</a>,
  },
  {
    key: "5",
    label: <a href="https://www.luohanacademy.com">Github Profile</a>,
  },
  {
    key: "6",
    label: <a href="https://www.luohanacademy.com">Sing Out</a>,
  },
];
