import { backLabel, goBack } from '../lib/route';

export default function BackButton() {
  return (
    <button onClick={goBack} className="back-btn" aria-label={`Go back to ${backLabel()}`}>
      <span aria-hidden>←</span> Back <span className="text-mute">· {backLabel()}</span>
    </button>
  );
}
