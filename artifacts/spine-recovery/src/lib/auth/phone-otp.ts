export interface PhoneOtpProvider {
  send(phone: string): Promise<void>;
  verify(phone: string, code: string): Promise<boolean>;
}

const otpStorageKey = 'spine-recovery:mock-otp';

/**
 * Development-only provider. Swap this implementation for Firebase Phone Auth
 * or Twilio Verify without changing the UI that calls it.
 */
export const mockPhoneOtpProvider: PhoneOtpProvider = {
  async send(phone) {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    sessionStorage.setItem(otpStorageKey, JSON.stringify({ phone, code }));
    console.info(`[Spine Recovery mock OTP] Code for ${phone}: ${code}`);
  },
  async verify(phone, code) {
    const saved = sessionStorage.getItem(otpStorageKey);
    if (!saved) return false;
    const challenge = JSON.parse(saved) as { phone: string; code: string };
    return challenge.phone === phone && challenge.code === code;
  },
};
