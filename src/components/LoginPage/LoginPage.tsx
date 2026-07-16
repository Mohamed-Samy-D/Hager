import { useState } from "react";
import { Heart, Eye, EyeOff } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "Hagora" && password === "281206") {
      onLogin();
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-charcoal flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={`${BASE}0.mp4`} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-sm mx-4">
        <div
          className={`bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/15 shadow-2xl shadow-black/40 ${
            shaking ? "animate-[shake_0.5s_ease-in-out]" : ""
          }`}
        >
          <div className="text-center mb-8">
            <Heart className="w-10 h-10 text-rose fill-rose mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold text-white">
              For <span className="text-rose">Hager</span> Only
            </h1>
            <p className="text-white/40 text-sm mt-2">Enter the secret to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-white/50 text-xs font-medium tracking-wider uppercase block mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(false); }}
                className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-rose/60 focus:ring-1 focus:ring-rose/30 transition-all"
                placeholder="Enter username"
                autoFocus
              />
            </div>

            <div>
              <label className="text-white/50 text-xs font-medium tracking-wider uppercase block mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false); }}
                  className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 pr-12 text-white text-sm placeholder-white/30 focus:outline-none focus:border-rose/60 focus:ring-1 focus:ring-rose/30 transition-all"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-rose text-xs text-center font-medium">
                Wrong username or password
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-rose hover:bg-rose-light text-white font-semibold py-3 rounded-xl transition-colors duration-200 mt-2"
            >
              Enter
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6 font-arabic">
          صُنع بكل حبي لـ هاجر
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
