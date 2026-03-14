import { redirect } from 'next/navigation';
import { getServerUser } from '@/lib/auth';
import DashboardContent from '@/components/DashboardContent';

export const metadata = {
  title: 'Dashboard - A Cut Above the Rest',
  description: 'Manage your appointments and account',
};

export default async function DashboardPage() {
  const authData = await getServerUser();

  if (!authData) {
    redirect('/login');
  }

  return <DashboardContent user={authData.user} />;
}
