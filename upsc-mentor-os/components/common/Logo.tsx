export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">
        U
      </div>

      <div className="leading-tight">
        <h1 className="text-sm font-bold">UPSC Mentor OS</h1>
        <p className="text-xs text-muted-foreground">
          AI Preparation Platform
        </p>
      </div>
    </div>
  );
}