import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Buy a Used Car in the UK',
  description: 'A practical guide to buying a used car in the UK — service history, fuel types, gearboxes, rust checks, OBD readers, and everything to look for before you commit.',
  openGraph: {
    title: 'How to Buy a Used Car in the UK — Kerb',
    description: 'A practical guide to buying a used car in the UK — service history, fuel types, gearboxes, rust checks, and everything to look for before you commit.',
    type: 'article',
  },
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to buy a used car in the UK — a practical guide',
  description: 'A practical guide to buying a used car in the UK — service history, fuel types, gearboxes, rust checks, OBD readers, and everything to look for before you commit.',
  author: { '@type': 'Person', name: 'Hans Mol' },
  publisher: { '@type': 'Organization', name: 'Kerb', url: 'https://kerb.autos' },
  datePublished: '2026-07-02',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://kerb.autos/advice/how-to-buy-a-used-car-uk' },
}

function StepLabel({ n }: { n: number }) {
  return <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#A0714A] mb-2">Step {n}</p>
}

function Divider() {
  return <hr className="border-none border-t border-[#E5E5E7] my-12" />
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#E5E5E7] border-l-[3px] border-l-[#A0714A] px-5 py-4 rounded my-6">
      <p className="text-[#0A0A0F] text-sm leading-relaxed m-0">{children}</p>
    </div>
  )
}

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#FFFBEB] border border-[#FDE047] border-l-[3px] border-l-[#CA8A04] px-5 py-4 rounded my-6 text-sm text-[#713F12]">
      {children}
    </div>
  )
}

export default function HowToBuyPage() {
  return (
    <>
      <Script id="article-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/advice" className="text-xs text-[#78716C] hover:text-[#0A0A0F] transition-colors">Advice</Link>
            <span className="text-[#E5E5E7]">/</span>
            <span className="text-xs text-[#78716C]">July 2026</span>
          </div>
          <h1 className="text-4xl font-light text-[#0A0A0F] tracking-tight leading-snug mb-6">
            How to buy a used car in the UK — a practical guide
          </h1>
          <p className="text-lg text-[#6E6E73] leading-relaxed">
            Buying a used car is one of the largest purchases most people make outside of property. It&apos;s also one of the easiest to get wrong — not because the information isn&apos;t out there, but because most buyers let their heart run ahead of their head. This guide exists to slow that down.
          </p>
        </div>

        <Divider />

        {/* Step 1 */}
        <StepLabel n={1} />
        <h2 className="text-2xl font-semibold text-[#0A0A0F] mb-4">Park your ego</h2>
        <p className="text-[#6E6E73] leading-relaxed mb-4">The most important thing you can do before looking at a single car is detach from desire. Owning a car — especially an older, more characterful one — can be expensive. The running costs, the maintenance, the unexpected repairs. If you start with a car you want rather than a car you can genuinely afford to own, you&apos;ll end up with something that costs you more than it should.</p>
        <p className="text-[#6E6E73] leading-relaxed mb-4">That doesn&apos;t mean buying something dull. It means being honest about what you can sustain — not just the purchase price, but the ongoing cost of running that car well.</p>
        <Callout><strong>The question to ask first:</strong> What will this car cost me to own for the next three years — not just to buy?</Callout>

        <Divider />

        {/* Step 2 */}
        <StepLabel n={2} />
        <h2 className="text-2xl font-semibold text-[#0A0A0F] mb-4">Research the brand&apos;s reputation before you fall in love with a model</h2>
        <p className="text-[#6E6E73] leading-relaxed mb-4">Every car brand has a character. Some are known for building things that last. Others have a reputation for expensive failures at certain ages or mileages. Before you go any further, spend time understanding whether the brand you&apos;re looking at is known for quality and longevity — and what the community says about the specific model you&apos;re considering.</p>
        <p className="text-[#6E6E73] leading-relaxed mb-4">The forums are your friend here. Owners Club communities, PistonHeads model-specific threads, and Reddit are filled with people who have owned these cars for years and know exactly what goes wrong. Read them before you book a viewing, not after.</p>
        <p className="text-[#6E6E73] leading-relaxed"><strong className="text-[#0A0A0F]">What you&apos;re looking for:</strong> what are the common faults at the age and mileage you&apos;re targeting? If you know what you&apos;re likely to have to fix, you&apos;re in an informed position. You can price it in, budget for it, and decide whether it&apos;s manageable — rather than being blindsided six months after you buy.</p>

        <Divider />

        {/* Step 3 */}
        <StepLabel n={3} />
        <h2 className="text-2xl font-semibold text-[#0A0A0F] mb-4">Service history is not optional</h2>
        <p className="text-[#6E6E73] leading-relaxed mb-4">This is non-negotiable. <strong className="text-[#0A0A0F]">The car must have a full service history.</strong> If it doesn&apos;t, walk away.</p>
        <p className="text-[#6E6E73] leading-relaxed mb-4">A service history tells you what has been done to the car, when, and by whom. Without it, you don&apos;t know what you&apos;re inheriting. An engine that looks clean and runs fine can be hiding a ticking clock — a component that was never replaced when it should have been, oil that hasn&apos;t been changed in 15,000 miles, a timing belt that&apos;s overdue.</p>
        <p className="text-[#6E6E73] leading-relaxed mb-4">Ideally, the history is stamped by franchised dealers or specialist independent garages, not just receipts in a folder. Look at the intervals — are they serviced on schedule? Any unusual gaps in the history? Those gaps are often where the problems live.</p>
        <p className="text-[#6E6E73] leading-relaxed mb-4">Here&apos;s a point most buyers miss: <strong className="text-[#0A0A0F]">a high-mileage car with a full service history is often more reliable than a low-mileage car without one</strong> — particularly in older cars. Miles aren&apos;t the enemy. Neglect is. An engine that has been serviced regularly and driven consistently will frequently outlast a low-mileage equivalent that has sat unmaintained, run on old oil, or been used only for short cold-start journeys. The history is the proof of care. The mileage is just a number.</p>
        <Warning>⚠ <strong>A low price is not a substitute for service history.</strong> Cars without history are cheaper for a reason.</Warning>

        <Divider />

        {/* Step 4 */}
        <StepLabel n={4} />
        <h2 className="text-2xl font-semibold text-[#0A0A0F] mb-4">Check for fault codes with an OBD reader</h2>
        <p className="text-[#6E6E73] leading-relaxed mb-4">An OBD (on-board diagnostics) reader plugs into a port under the dashboard — usually found near the steering column — and reads any fault codes stored in the car&apos;s computer. You can buy a basic one online for under £20, or use a Bluetooth version with a free app on your phone.</p>
        <p className="text-[#6E6E73] leading-relaxed mb-4">Ask the seller if you can plug one in before you commit to a test drive. Any seller worth buying from will agree. A car with hidden fault codes will often appear to run fine on a short drive — the codes are the tell.</p>
        <p className="text-[#6E6E73] leading-relaxed">Not every fault code is catastrophic — some are minor sensor issues. But any code that the seller can&apos;t explain should be a flag, and any code relating to the engine, transmission, or emissions should make you pause and dig deeper.</p>

        <Divider />

        {/* Step 5 */}
        <StepLabel n={5} />
        <h2 className="text-2xl font-semibold text-[#0A0A0F] mb-4">Check the history with CarVertical</h2>
        <p className="text-[#6E6E73] leading-relaxed mb-4">Before you hand over any money, run the car&apos;s registration through <strong className="text-[#0A0A0F]">CarVertical</strong> (carvertical.com). A history check tells you whether the car has been written off, has outstanding finance, has had its mileage clocked, or has been involved in accidents that weren&apos;t declared.</p>
        <p className="text-[#6E6E73] leading-relaxed mb-4">It costs a few pounds and takes two minutes. The information it surfaces can save you from inheriting someone else&apos;s problem — or from buying a car that isn&apos;t legally the seller&apos;s to sell.</p>
        <Callout>Always run a history check, even if the seller is a dealer, even if the car looks immaculate, and even if the service history is complete. It&apos;s the last independent check before you commit.</Callout>

        <Divider />

        {/* Step 6 */}
        <StepLabel n={6} />
        <h2 className="text-2xl font-semibold text-[#0A0A0F] mb-4">Inspect the condition — know what you&apos;re looking at</h2>
        <p className="text-[#6E6E73] leading-relaxed mb-4">The visual inspection of a car is less about cosmetics and more about what the condition tells you about how the car has been looked after.</p>
        <p className="text-[#6E6E73] leading-relaxed mb-4"><strong className="text-[#0A0A0F]">Paint consistency.</strong> Walk around the car in good light. The paint should be the same shade on every panel. Mismatched paint — even slightly — can indicate a previous repair or panel replacement after an accident.</p>
        <p className="text-[#6E6E73] leading-relaxed mb-4"><strong className="text-[#0A0A0F]">Panel gaps.</strong> Look at the gaps between panels — bonnet to wing, door to sill, boot lid to quarter panel. They should be even and consistent on both sides. Large or uneven gaps can indicate structural repairs or poorly fitted replacement panels.</p>
        <p className="text-[#6E6E73] leading-relaxed mb-6"><strong className="text-[#0A0A0F]">Rust.</strong> This matters more than most buyers realise, particularly on older UK cars where salt and road grime do their worst.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          <div className="bg-[#F0FDF4] border border-[#86EFAC] rounded-md p-5">
            <p className="text-[#15803D] font-semibold text-sm mb-2">Surface rust — acceptable</p>
            <p className="text-[#166534] text-sm leading-relaxed m-0">Light rust on exposed metal edges, bolts, or brake discs is normal. It can be treated and managed. Don&apos;t let it put you off a car that is otherwise solid.</p>
          </div>
          <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-md p-5">
            <p className="text-[#DC2626] font-semibold text-sm mb-2">Deep-seated rust — walk away</p>
            <p className="text-[#991B1B] text-sm leading-relaxed m-0">Rust that has eaten through metal — in wheel arches, sills, floor pans, or the subframe — is structural. Repairing it properly is expensive. Walk away.</p>
          </div>
        </div>

        <p className="text-[#6E6E73] leading-relaxed">If you have any doubt about the condition of the underside, get the car up on a lift before committing. Many independent garages will do a pre-purchase inspection for £50–£100. On a car worth thousands, it&apos;s money well spent.</p>

        <Divider />

        {/* Step 7 */}
        <StepLabel n={7} />
        <h2 className="text-2xl font-semibold text-[#0A0A0F] mb-4">Think about running costs, not just purchase price</h2>
        <p className="text-[#6E6E73] leading-relaxed mb-4"><strong className="text-[#0A0A0F]">Fuel consumption.</strong> Check real-world miles per gallon for the car you&apos;re buying — not the manufacturer&apos;s official figures, which are almost always optimistic, but owner-reported figures from forums and sites like Fuelly. A car that costs £2,000 more to buy but does 10mpg better can pay back that difference inside a year if you&apos;re doing decent mileage.</p>
        <p className="text-[#6E6E73] leading-relaxed mb-4"><strong className="text-[#0A0A0F]">Servicing intervals.</strong> Budget to service your car every 6,000 miles, not 10,000 — regardless of what the manufacturer says. Variable service intervals on modern cars can extend to 10,000 miles or more, but they&apos;re optimised for convenience, not longevity. Shorter intervals with a quality oil are the single easiest way to extend the life of your car.</p>
        <p className="text-[#6E6E73] leading-relaxed"><strong className="text-[#0A0A0F]">Insurance and tax.</strong> Check insurance costs before you fall in love. Some practical family cars sit in surprisingly high insurance groups. Check before you commit.</p>

        <Divider />

        {/* Step 8 */}
        <StepLabel n={8} />
        <h2 className="text-2xl font-semibold text-[#0A0A0F] mb-4">Diesel or petrol — match the fuel type to how you actually drive</h2>
        <p className="text-[#6E6E73] leading-relaxed mb-4">This one question eliminates a lot of expensive mistakes. The answer comes down to how you use the car — not which fuel costs less at the pump.</p>
        <p className="text-[#6E6E73] leading-relaxed mb-4"><strong className="text-[#0A0A0F]">If you mostly do short trips — school runs, local errands, town driving — buy petrol.</strong> Diesel engines are designed to be run hard and hot. When they spend most of their life on short cold journeys, they accumulate carbon deposits in the DPF (Diesel Particulate Filter) and EGR valve. The DPF needs to reach a sustained temperature — typically at 50mph or above for a period — to burn off the soot it collects. If that never happens, the filter blocks. A blocked DPF can cost anywhere from £500 to over £2,000 to fix depending on the car. These are not freak failures — they are the predictable result of using a diesel engine for the wrong job.</p>
        <p className="text-[#6E6E73] leading-relaxed mb-4"><strong className="text-[#0A0A0F]">If you do a long daily commute or regular motorway miles — diesel is worth considering.</strong> Driven properly, a diesel will run hot, keep itself clean, and return excellent fuel economy on long runs. The engine is doing what it was built for.</p>
        <Callout><strong>Quick rule:</strong> Short trips, town driving, school runs → petrol. Long commutes, regular motorway use → diesel can work. If in doubt, petrol is the safer choice for a used car.</Callout>

        <Divider />

        {/* Step 9 */}
        <StepLabel n={9} />
        <h2 className="text-2xl font-semibold text-[#0A0A0F] mb-4">Manual or automatic — easier to drive is not the same as easier to own</h2>
        <p className="text-[#6E6E73] leading-relaxed mb-4">An automatic is more convenient to drive, particularly in traffic. But convenience has a cost, and it&apos;s worth understanding what that cost looks like before you commit.</p>
        <p className="text-[#6E6E73] leading-relaxed mb-4"><strong className="text-[#0A0A0F]">Manual gearboxes are simpler and cheaper to maintain.</strong> The clutch is the main wear item — it&apos;s predictable, well understood, and the repair cost is known. The gearbox itself, if not abused, is robust and long-lived. When something goes wrong with a manual gearbox, it is usually diagnosable and fixable at a reasonable cost.</p>
        <p className="text-[#6E6E73] leading-relaxed mb-4"><strong className="text-[#0A0A0F]">Automatic gearboxes are more complex and can be expensive to repair when they go wrong.</strong> Traditional torque converter automatics are generally the most reliable. Dual-clutch gearboxes (DSG, PDK, DCT) offer quick, efficient changes but have a less forgiving reputation at higher mileages or when servicing has been neglected. CVT transmissions — common in smaller automatics — can also be costly to replace when they fail.</p>
        <p className="text-[#6E6E73] leading-relaxed">None of this means you should avoid an automatic — but if you&apos;re buying one, factor in the potential cost of gearbox repair and check the service history specifically for gearbox oil changes. It&apos;s one of the most commonly skipped service items and one of the most important for longevity.</p>

        <Divider />

        {/* Checklist */}
        <div className="bg-white border border-[#E5E5E7] rounded-md p-6 mb-12">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#0A0A0F] mb-5">Before you buy — checklist</p>
          <ul className="space-y-0 list-none p-0">
            {[
              'Research the brand reputation and common faults for this model at this age and mileage',
              'Full service history present and consistent',
              'OBD reader check — no unexplained fault codes',
              'CarVertical history check run on the registration',
              'Fuel type matches how you actually drive (short trips → petrol, long commute → diesel)',
              'If diesel: service history shows DPF maintenance, no signs of short-trip-only use',
              'If automatic: gearbox oil changes present in service history',
              'Paint consistency checked in good light',
              'Panel gaps even on both sides of the car',
              'Surface rust only — no deep-seated rust in arches, sills, or floor',
              'Real-world fuel consumption is acceptable',
              'Insurance and tax costs confirmed before committing',
              'Servicing budget planned at 6,000-mile intervals',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 py-2.5 border-b border-[#F3F4F6] last:border-0">
                <span className="mt-1 w-4 h-4 rounded-full border-[1.5px] border-[#D1D5DB] flex-shrink-0" />
                <span className="text-sm text-[#4A4A52]">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ICW block */}
        <div className="bg-[#0A0A0F] rounded-md p-8 mb-10">
          <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#A0714A] mb-3">Once you&apos;ve bought</p>
          <h3 className="text-xl font-medium text-white mb-4">Get the underside sorted immediately</h3>
          <p className="text-[#B0B0B8] text-sm leading-relaxed mb-4">The one thing most buyers never think about — and should — is what&apos;s happening underneath the car. Road salt, grime, and moisture do their worst where you can&apos;t see them. By the time visible rust appears on the underside, the damage is already significant.</p>
          <p className="text-[#B0B0B8] text-sm leading-relaxed">Have the underside professionally dry ice cleaned to remove all trapped salt and grime, then protected with a <strong className="text-white">graphene-reinforced armour coating</strong>. It&apos;s the protection your car needs from the moment you own it. <a href="https://icecleanworks.com" className="text-[#A0714A] hover:text-[#C49272] transition-colors">Ice Clean Works</a> specialises in exactly this.</p>
        </div>

        {/* CTA */}
        <div className="bg-[#A0714A] rounded-md p-8 text-center">
          <p className="text-white/80 text-sm mb-4">Ready to find your next car? Kerb lists verified UK dealers without inflated fees or algorithm penalties.</p>
          <Link
            href="/search"
            className="inline-block bg-white text-[#A0714A] px-7 py-3 rounded text-sm font-semibold no-underline hover:bg-[#F8F8FA] transition-colors"
          >
            Search cars on Kerb
          </Link>
        </div>

      </div>
    </>
  )
}
