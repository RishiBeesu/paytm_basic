export function InputBox({ label, placeholder, onChange }) {
  return (
    <div>
      <div className="text-xl font-medium text-left py-2">{label}</div>
      <div>
        <input
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          className="w-full rounded border px-2 py-1 border-slate-200"
        />
      </div>
    </div>
  );
}
