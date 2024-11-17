// Audio context singleton
let audioContext;

// Initialize audio context on user interaction
export function initAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

export const generateClickSound = async () => {
  const context = initAudioContext();
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.frequency.setValueAtTime(800, context.currentTime);
  gainNode.gain.setValueAtTime(0.05, context.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);

  oscillator.start();
  oscillator.stop(context.currentTime + 0.1);
};

export const playWinSound = async () => {
  const context = initAudioContext();
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  // Victory melody
  oscillator.frequency.setValueAtTime(440, context.currentTime); // A4
  oscillator.frequency.setValueAtTime(554.37, context.currentTime + 0.2); // C#5
  oscillator.frequency.setValueAtTime(659.25, context.currentTime + 0.4); // E5

  gainNode.gain.setValueAtTime(0.1, context.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.6);

  oscillator.start();
  oscillator.stop(context.currentTime + 0.6);
};
