import { useRef, useEffect } from "react";

const useProjectSounds = () => {
  const whooshSoundRef = useRef(null);
  const backSoundRef = useRef(null);

  useEffect(() => {
    // Dynamically create audio elements
    whooshSoundRef.current = new Audio("/assets/sounds/whoosh.mp3");
    backSoundRef.current = new Audio("/assets/sounds/whoosh.mp3");
    
    // Set the volume and preload
    if (whooshSoundRef.current) {
      whooshSoundRef.current.volume = 0.2;
    }
    if (backSoundRef.current) {
      backSoundRef.current.volume = 0.2;
    }

    // Clean up function
    return () => {
      if (whooshSoundRef.current) {
        whooshSoundRef.current.pause();
        whooshSoundRef.current = null;
      }
      if (backSoundRef.current) {
        backSoundRef.current.pause();
        backSoundRef.current = null;
      }
    };
  }, []);

  const playWhooshSound = () => {
    if (whooshSoundRef.current) {
      whooshSoundRef.current.currentTime = 0;
      whooshSoundRef.current.play().catch(() => {});
    }
  };

  const playBackSound = () => {
    if (backSoundRef.current) {
      backSoundRef.current.currentTime = 0;
      backSoundRef.current.play().catch(() => {});
    }
  };

  return { playWhooshSound, playBackSound };
};

export default useProjectSounds;