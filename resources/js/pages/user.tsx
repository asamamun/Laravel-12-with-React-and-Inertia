import { dashboard, login, mypage, register } from '@/routes';
import { type SharedData, type BreadcrumbItem   } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users ',
        href: '/users',
    },
];
// create user data type
export type User = {
    id: number;
    name: string;
    email: string;
};


/**
 * User page
 * 
 * This page will show all users in the system, 
 * and allow administrators to edit or delete users.
 * 
 * @param {Object} props - props passed from Inertia
 * @param {Object} props.auth - the authenticated user
 * @param {Array<User>} props.users - list of all users in the system
 * @param {User} props.current - the current user
 * @return {JSX.Element} - the user page component
 */
export default function User() {
    //props get auth automatically
    const { auth,users, current } = usePage().props;

    return (
        <AppLayout breadcrumbs={[]}>
            <Head title="All Users" />
              <h1>welcome {current?.name} </h1>
              <hr />
              <table className="w-full table-auto border border-gray-200">
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {users.map(user => (
                          <tr key={user.id} className="border-b border-gray-200">
                              <td>{user.id}</td>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td className="flex gap-2">
                                EDIT | DELETE
                                  {/* <Link href={edit(user.id).url}>
                                      <Button variant="primary" size="sm">
                                          Edit
                                      </Button>
                                  </Link>
                                  <Link href={route('users.destroy', user.id).url}>
                                      <Button variant="danger" size="sm">
                                          Delete
                                      </Button>
                                  </Link> */}
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
              
        </AppLayout>
    );
}
