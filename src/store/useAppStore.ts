import { create } from 'zustand';

export type SectionState = 'intro' | 'hero' | 'gallery' | 'surprise' | 'emojis' | 'wishes' | 'finale' | 'dream';

interface AppState {
  currentSection: SectionState;
  unlockNext: () => void;
  setSection: (section: SectionState) => void;
}

const sectionFlow: SectionState[] = ['intro', 'hero', 'gallery', 'surprise', 'emojis', 'wishes', 'finale', 'dream'];

export const sectionMusicMap: Record<SectionState, string> = {
  intro: '/music/intro.mp3',
  hero: '/music/intro.mp3',
  gallery: '/music/gallery.mp3',
  surprise: '/music/laugh.mp3',
  emojis: '/music/laugh.mp3',
  wishes: '/music/intro.mp3',
  finale: '/music/intro.mp3',
  dream: '/music/intro.mp3',
};

export const useAppStore = create<AppState>((set) => ({
  currentSection: 'intro',
  unlockNext: () =>
    set((state) => {
      const currentIndex = sectionFlow.indexOf(state.currentSection);
      if (currentIndex < sectionFlow.length - 1) {
        return { currentSection: sectionFlow[currentIndex + 1] };
      }
      return state;
    }),
  setSection: (section) => set({ currentSection: section }),
}));
