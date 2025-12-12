import { CheckCircle, Eye, EyeOff, XCircle } from "lucide-react";
import React, { useState } from "react";


export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // compute strength 0..6
  function passwordStrength(pw: string) {
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return Math.min(score, 6);
  }

  function strengthLabel(score: number) {
    if (score <= 1) return "Very weak";
    if (score === 2) return "Weak";
    if (score === 3) return "Okay";
    if (score === 4) return "Good";
    if (score === 5) return "Strong";
    return "Very strong";
  }

  function strengthColor(score: number) {
    // returns tailwind classes for the progress bar
    if (score <= 1) return "bg-red-400"; // very weak / red
    if (score === 2 || score === 3) return "bg-yellow-400"; // weak/okay / yellow
    return "bg-green-500"; // good/strong / green
  }

  function validatePassword(pw: string) {
    if (pw.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(pw)) return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(pw)) return "Password must contain at least one lowercase letter.";
    if (!/[0-9]/.test(pw)) return "Password must contain at least one number.";
    return "";
  }

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setSuccess("");

    const validationErrors: { [k: string]: string } = {};
    if (!oldPassword) validationErrors.oldPassword = "Old password is required.";

    const newPwErr = validatePassword(newPassword);
    if (newPwErr) validationErrors.newPassword = newPwErr;

    if (confirmPassword !== newPassword) validationErrors.confirmPassword = "Passwords do not match.";

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
    
      setSuccess("Password updated successfully.");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrors({});
    } catch (err: any) {
      setErrors({ form: err?.message || "Failed to update password. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  const strength = passwordStrength(newPassword);
  const strengthPct = Math.round((strength / 6) * 100);

  return (
    <div className="flex flex-col py-10 gap-6">
      <h2 id="password-change-title" className="text-xl font-semibold">
        Change Password
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-full bg-white shadow-lg rounded-2xl p-8 space-y-8"
        aria-labelledby="password-change-title"
      >
        {errors.form && (
          <div className="text-red-700 bg-red-50 border border-red-100 rounded-md px-3 py-2">{errors.form}</div>
        )}

        {success && (
          <div className="text-green-700 bg-green-50 border border-green-100 rounded-md px-3 py-2">{success}</div>
        )}

        {/* Old password */}
        <div>
          <label className="block text-sm font-medium mb-1">Old Password</label>

          <div className="relative">
            <input
              type={showOld ? "text" : "password"}
              value={oldPassword}
              onChange={(ev) => setOldPassword(ev.target.value)}
              className={`w-full px-4 pr-12 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-shadow ${
                errors.oldPassword ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Enter your current password"
              aria-invalid={!!errors.oldPassword}
              aria-describedby={errors.oldPassword ? "old-error" : undefined}
            />

            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={showOld ? "Hide old password" : "Show old password"}
            >
              {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.oldPassword && (
            <p id="old-error" className="mt-1 text-xs text-red-600">{errors.oldPassword}</p>
          )}
        </div>

        {/* New password */}
        <div>
          <label className="block text-sm font-medium mb-1">New Password</label>

          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(ev) => setNewPassword(ev.target.value)}
              className={`w-full px-4 pr-12 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-shadow ${
                errors.newPassword ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Create a strong password"
              aria-invalid={!!errors.newPassword}
              aria-describedby={errors.newPassword ? "new-error" : undefined}
            />

            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={showNew ? "Hide new password" : "Show new password"}
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.newPassword && (
            <p id="new-error" className="mt-1 text-xs text-red-600">{errors.newPassword}</p>
          )}

          {/* Strength meter (live) */}
          <div className="mt-3" aria-hidden={false}>
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-600">Strength: {strengthLabel(strength)}</div>
              <div className="text-xs font-mono text-gray-500">{strengthPct}%</div>
            </div>

            <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${strengthColor(strength)}`}
                style={{ width: `${strengthPct}%` }}
                aria-hidden
              />
            </div>

            <div className="mt-2 flex gap-3 text-xs">
              <div className="flex items-center gap-1">
                {newPassword.length >= 8 ? (
                  <CheckCircle size={14} className="text-green-500" />
                ) : (
                  <XCircle size={14} className="text-red-400" />
                )}
                <span className="text-gray-600">8 characters</span>
              </div>

              <div className="flex items-center gap-1">
                {/[A-Z]/.test(newPassword) ? (
                  <CheckCircle size={14} className="text-green-500" />
                ) : (
                  <XCircle size={14} className="text-red-400" />
                )}
                <span className="text-gray-600">Uppercase</span>
              </div>

              <div className="flex items-center gap-1">
                {/[0-9]/.test(newPassword) ? (
                  <CheckCircle size={14} className="text-green-500" />
                ) : (
                  <XCircle size={14} className="text-red-400" />
                )}
                <span className="text-gray-600">Number</span>
              </div>
            </div>

            <div className="mt-2 text-xs text-gray-500">Include uppercase, lowercase, a number — longer is stronger.</div>
          </div>
        </div>

        {/* Confirm password */}
        <div>
          <label className="block text-sm font-medium mb-1">Confirm Password</label>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(ev) => setConfirmPassword(ev.target.value)}
              className={`w-full px-4 pr-12 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-shadow ${
                errors.confirmPassword ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Repeat new password"
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? "confirm-error" : undefined}
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.confirmPassword && (
            <p id="confirm-error" className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              setOldPassword("");
              setNewPassword("");
              setConfirmPassword("");
              setErrors({});
              setSuccess("");
            }}
            className="px-4 py-2 rounded-lg border hover:bg-gray-50"
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
}
