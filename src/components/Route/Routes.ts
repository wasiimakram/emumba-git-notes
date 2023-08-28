import { Add, Details, Edit } from "../../modules/gist";
import Home from "../../modules/home/Home";
import Profile from "../../modules/profile/Profile";
import CallBack from "../common/CallBack";

const routes = [
    { path: "/create", component: Add, type: 'auth' },
    { path: "/my-gists", component: Profile, type: 'auth' },
    { path: "/gist/:id", component: Details, },
    { path: "/edit/:id", component: Edit, type: 'auth' },
    { path: "/callback", component: CallBack, },
    { path: "/", component: Home, },
];

export default routes;
