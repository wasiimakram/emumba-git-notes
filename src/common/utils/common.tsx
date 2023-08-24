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
    label: <a href="https://www.aliyun.com">Your Gists</a>,
  },
  {
    key: "3",
    label: <a href="https://www.luohanacademy.com">Stared Gists</a>,
  },
  {
    key: "4",
    label: <a href="https://www.luohanacademy.com">Github Profile</a>,
  },
  {
    key: "5",
    label: <a href="https://www.luohanacademy.com">Sing Out</a>,
  },
];
