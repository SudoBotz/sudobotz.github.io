import { redirect } from 'next/navigation';

export default function RootPage() {
  // For static export, redirect to Persian by default
  redirect('/fa');
}
