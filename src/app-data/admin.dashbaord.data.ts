import { ColumnsType } from "antd/es/table";
import { AdminStats, Data } from "../common/typings/admin.d";

export const statsColumns: ColumnsType<AdminStats> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '33%',
    },
    {
        title: 'Total Hours',
        dataIndex: 'hours',
        key: 'hours',
        width: '33%',
    },
    {
        title: 'Daily Average Hrs',
        dataIndex: 'average',
        key: 'average',
        width: '33%',
    }

];
export const statsTable: AdminStats[] = [
    {
        key: '1',
        name: 'Saad',
        hours: 160,
        average: 8.00
    },
    {
        key: '2',
        name: 'Husnain',
        hours: 150,
        average: 7.00
    },
    {
        key: '3',
        name: 'Ayaz Afzal',
        hours: 130,
        average: 9.00
    },
    {
        key: '4',
        name: 'Wasim',
        hours: 190,
        average: 9.00
    },
    {
        key: '5',
        name: 'Awais',
        hours: 190,
        average: 9.00
    },
    {
        key: '6',
        name: 'Haseeb',
        hours: 190,
        average: 9.00
    },
]

export const availablityData: Data = {
    Present: [
        'Saad Musthaq', 'Zahid But', 'Ali Ahmad', 'M Wasim'
    ],
    OnLeave: [
        'Husnain Maqsood', 'Abdul Moeez', 'Abeer Fiaz', 'Awais'
    ],
    Absent: [
        'Ayaz Afzal', 'Zeeshan Sattar', 'Bilal Mirza', 'Haseeb'
    ]
};
