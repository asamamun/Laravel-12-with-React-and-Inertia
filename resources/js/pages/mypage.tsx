import { dashboard, login, mypage, register } from '@/routes';
import { type SharedData, type BreadcrumbItem   } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'MyPage',
        href: '/mypage',
    },
];
export default function MyPage() {
    //props get auth automatically
    const { auth,colors,loggedInUser } = usePage().props;
    // const [id, name, email] = [loggedInUser.id, loggedInUser.name, loggedInUser.email];
    // console.log('loggedInUser:', loggedInUser);
    // console.log('id:', id);
    // console.log('name:', name);
    // console.log('email:', email);

    return (
        <AppLayout breadcrumbs={[]}>
            <Head title="My page" />
              <h1>welcome <mark> {loggedInUser.name} </mark></h1>
              {/* link to dashboard */}
              <Link href={dashboard()}>Dashboard</Link> | 
              {/* link to login */}
              <Link href={login()}>Login</Link> | 
              {/* link to register */}
              <Link href={register()}>Register</Link> | 
              <Link href={mypage()}>MyPage</Link>
              <hr />
              <h2>Colors</h2>
              <ul>
                  {colors.map(color => (
                      <li key={color}>{color}</li>
                  ))}
              </ul>
        </AppLayout>
    );
}
