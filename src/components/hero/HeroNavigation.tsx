import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';

interface HeroNavigationProps {
  onPrevSlide: () => void;
  onNextSlide: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const HeroNavigation: React.FC<HeroNavigationProps> = ({
  onPrevSlide,
  onNextSlide,
  isPlaying,
  onTogglePlay,
  isMuted,
  onToggleMute
}) => {
  return (
    <div className="cinematic-hero-bottom-bar">
      {/* Left Navigation Arrows & Play/Pause */}
      <div className="cinematic-hero-arrows-group">
        <button
          onClick={onPrevSlide}
          className="cinematic-hero-control-btn"
          aria-label="Previous slide"
        >
          <ChevronLeft className="cinematic-hero-control-icon" />
        </button>

        <button
          onClick={onNextSlide}
          className="cinematic-hero-control-btn"
          aria-label="Next slide"
        >
          <ChevronRight className="cinematic-hero-control-icon" />
        </button>

        <button
          onClick={onTogglePlay}
          className="cinematic-hero-control-btn"
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isPlaying ? (
            <Pause className="cinematic-hero-control-icon" />
          ) : (
            <Play className="cinematic-hero-control-icon" />
          )}
        </button>
      </div>

      {/* Right Controls: Ambient Music & Silk Mark Badge */}
      <div className="cinematic-hero-right-tools">
        <button
          onClick={onToggleMute}
          className="cinematic-hero-audio-btn"
          aria-label={isMuted ? 'Play ambient fashion sound' : 'Mute ambient sound'}
          title={isMuted ? 'Enable Ambient Haute Couture Sound' : 'Mute Sound'}
        >
          {isMuted ? (
            <>
              <VolumeX className="cinematic-hero-audio-icon" />
              <span>Sound Off</span>
            </>
          ) : (
            <>
              <Volume2 className="cinematic-hero-audio-icon animate-pulse" />
              <span>Audio Playing</span>
            </>
          )}
        </button>

        <div className="cinematic-hero-hallmark">
          <div className="cinematic-hero-hallmark-pulse animate-ping" />
          <span className="cinematic-hero-hallmark-text">Silk Mark India Certified</span>
        </div>
      </div>
    </div>
  );
};
