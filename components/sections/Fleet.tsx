import { getCars } from '@/lib/content';
import FleetClient from './FleetClient';

export default async function Fleet() {
  const cars = await getCars();
  return <FleetClient cars={cars} />;
}
