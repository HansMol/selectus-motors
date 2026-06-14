import { Nav } from '@/components/layout/nav'
import { DealerWizard } from './wizard'

export const metadata = {
  title: 'Register Your Dealership — Selectus Motors',
  description: 'List your inventory on Selectus Motors. Free to list, direct leads, no platform intermediation.',
}

export default function DealerRegisterPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#0A0A0F] pt-12 pb-20">
        <DealerWizard />
      </main>
    </>
  )
}
