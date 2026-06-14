export const runtime = 'edge'

import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0A0A0F] flex items-center justify-center px-4 py-16">
      <SignIn
        appearance={{
          elements: {
            card:             'shadow-none border border-[#1C1C1E] bg-[#111113]',
            headerTitle:      'text-white font-light tracking-tight',
            headerSubtitle:   'text-[#6E6E73]',
            dividerLine:      'bg-[#1C1C1E]',
            dividerText:      'text-[#6E6E73]',
            formFieldLabel:   'text-[#6E6E73] text-[11px] tracking-widest uppercase font-semibold',
            footerActionLink: 'text-[#C4C6CC] hover:text-white',
          },
        }}
      />
    </div>
  )
}
