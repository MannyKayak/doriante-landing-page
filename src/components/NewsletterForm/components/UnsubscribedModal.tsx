import type { FormEvent } from 'react'

type Props = {
  uid: string
  unsubscribeEmail: string
  unsubscribeMessage: string | null
  isUnsubscribing: boolean
  onClose: () => void
  onEmailChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export default function UnsubscribedModal({
  uid,
  unsubscribeEmail,
  unsubscribeMessage,
  isUnsubscribing,
  onClose,
  onEmailChange,
  onSubmit,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl bg-white p-6 text-left" onClick={(event) => event.stopPropagation()}>
        <h3 className="text-lg font-medium text-black">Disiscrizione newsletter</h3>
        <p className="mt-2 text-sm text-black/80">
          Inserisci l&apos;email con cui ti sei iscritto per confermare la disiscrizione.
        </p>

        <form className="mt-4 space-y-3" onSubmit={onSubmit}>
          <label className="sr-only" htmlFor={`${uid}-unsubscribe-email`}>
            Email
          </label>
          <input
            id={`${uid}-unsubscribe-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={unsubscribeEmail}
            onChange={(event) => onEmailChange(event.target.value)}
            placeholder="Email"
            className={[
              'h-11 w-full rounded-md bg-white px-4 text-sm text-black outline-none',
              'placeholder:text-black/50 ring-1 ring-black/10 focus:ring-2 focus:ring-black/40',
            ].join(' ')}
            disabled={isUnsubscribing}
          />

          <button
            type="submit"
            disabled={isUnsubscribing}
            className={[
              'h-11 w-full rounded-md bg-dark text-sm font-medium text-white',
              'transition-opacity hover:opacity-90 disabled:opacity-60',
            ].join(' ')}
          >
            {isUnsubscribing ? 'Invio...' : 'Disinscriviti'}
          </button>
        </form>

        {unsubscribeMessage ? (
          <p className="mt-3 text-sm text-red-900/80" aria-live="polite">
            {unsubscribeMessage}
          </p>
        ) : null}
      </div>
    </div>
  )
}
