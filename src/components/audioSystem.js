// Simple audio system for UI feedback
class AudioSystem {
  constructor() {
    this.enabled = true;
  }

  playClick() {
    if (!this.enabled) return;
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTcIGWi77eefTRAMUKfj8LZjHAY4ktfyzHksBSR3x/DdkEAKFF606+uoVRQKRp/g8r5sIQUrgs7y2Yk3CBlou+3nn00QDFCn4/C2YxwGOJLX8sx5LAUkd8fw3ZBAChdeuOvsr1YVCkef4PK9bCAFKoHN8tmJNwgZaLvt559NEAxQp+PwtmMcBjiS1/LMeSwFJHfH8N2QQAoVXrjr7K9WFQpHn+Dyvmsf'); 
      audio.volume = 0.3;
      audio.play();
    } catch (e) {
      console.log('Audio play failed:', e);
    }
  }

  playSuccess() {
    if (!this.enabled) return;
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTcIGWi77eefTRAMUKfj8LZjHAY4ktfyzHksBSR3x/DdkEAKFF606+uoVRQKRp/g8r5sIQUrgs7y2Yk3CBlou+3nn00QDFCn4/C2YxwGOJLX8sx5LAUkd8fw3ZBAChdeuOvsr1YVCkef4PK9bCAFKoHN8tmJNwgZaLvt559NEAxQp+PwtmMcBjiS1/LMeSwFJHfH8N2QQAoVXrjr7K9WFQpHn+Dyvmsf');
      audio.volume = 0.4;
      audio.play();
    } catch (e) {
      console.log('Audio play failed:', e);
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

const audioSystem = new AudioSystem();
export default audioSystem;

