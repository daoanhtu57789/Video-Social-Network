//các trạng thái chưa xem , đang xem và đã xem tương ứng với giá trị của nó
import VideoBoard from './../containers/VideoBoard/index';
import AdminHomePage from './../containers/AdminHomePage/index';
export const STATUSES = [
    {
        value : 0,
        label : 'NOT SEEN'
    },
    {
        value : 1,
        label : 'WATCHING'
    },
    {
        value : 2,
        label : 'WATCHED'
    }
];

export const API_ENDPOINT = 'http://localhost:3000';

export const PAGE_ROUTES = [
    {
        path:'/admin',
        component: AdminHomePage,
        exact : true,
        name : "Home Page"
    },
    {
        path:'/admin/videos',
        component: VideoBoard,
        exact : true,
        name : "Video social network"
    },
];