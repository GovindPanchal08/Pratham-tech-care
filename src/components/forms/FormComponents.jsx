export function FormField({ label, error, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-brand-500 ml-0.5">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1" role="alert">
          <span className="inline-block w-3 h-3 shrink-0">
            <svg viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0zm.75 8.25h-1.5v-1.5h1.5v1.5zm0-3h-1.5v-3h1.5v3z"/>
            </svg>
          </span>
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({ register, error, ...props }) {
  return (
    <input
      className={`input-field ${error ? 'border-red-300 focus:ring-red-400' : ''}`}
      aria-invalid={!!error}
      {...register}
      {...props}
    />
  );
}

export function TextArea({ register, error, rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      className={`input-field resize-none ${error ? 'border-red-300 focus:ring-red-400' : ''}`}
      aria-invalid={!!error}
      {...register}
      {...props}
    />
  );
}

export function SelectInput({ register, error, options = [], placeholder, ...props }) {
  return (
    <select
      className={`input-field ${error ? 'border-red-300 focus:ring-red-400' : ''} ${
        props.value === '' ? 'text-slate-400' : 'text-slate-800'
      }`}
      aria-invalid={!!error}
      {...register}
      {...props}
    >
      <option value="" disabled>
        {placeholder || 'Select an option'}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
