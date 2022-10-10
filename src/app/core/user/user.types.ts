export interface User
{
    id: string;
    name: string;
    email: string;
    avatar?: string;
    status?: string;
    perms: string[];
    roleTypeID :number;
    metaData:any
}
