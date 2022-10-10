/* eslint-disable */
export const users = [
    {
        id: '1cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
        name: 'Demo Süpervizor Kullanıcı',
        email: 'demo@ritimus.com',
        avatar: 'assets/images/avatars/brian-hughes.jpg',
        status: 'online',
        roleTypeID : -1,

        perms: ["CLA-000", "CLA-002", "CLA-003", "HMT-000", 'HMT-001',
            "NTF-100", 'NTF-001', 'SUP-100', 'SUP-200', 'ADM-100', 'ADM-300', 'ADM-301', 'ADM-308', 'ADM-400', 'ADM-500', 'MYH-000'
        ]
    },
    {
        id: '2cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
        name: 'Demo Veli Kullanıcı',
        email: 'demoveli@ritimus.com',
        avatar: 'assets/images/avatars/brian-hughes.jpg',
        status: 'online',
        roleTypeID : 1,
        perms: [ 'NTF-000', 'SUP-100', 'SUP-200',
             'MYH-000'
        ],
        metaData: {
            class: "1/A",
            studentNo: '123'
        }
    },
    {
        id: '3faad35d-07a3-4447-a6c3-d8c3d54fd5df',
        name: 'Demo Öğretmen Kullanıcı',
        email: 'demoogretmen@ritimus.com',
        avatar: 'assets/images/avatars/brian-hughes.jpg',
        status: 'online',
        roleTypeID : 2,
        perms: [
            "CLA-000","HMT-000", 'HMT-001',
            "NTF-100", 'NTF-001',  'SUP-200',
              
        ]
    },
    {
        id: '4cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
        name: 'Demo  Müdür Kullanıcı',
        email: 'demomudur@ritimus.com',
        avatar: 'assets/images/avatars/brian-hughes.jpg',
        status: 'online',
        roleTypeID : 3,
        perms: [
            "NTF-100", 'NTF-001',  'ADM-100', 'ADM-300', 
            'ADM-301', 'ADM-308', 'ADM-400'
        ]
    },

]