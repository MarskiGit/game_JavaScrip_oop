import { Common, HIDDEN_SCREEN } from './Common.esm.js';
import { media } from './Media.esm.js';

const selectors = {
    MUSIC_ON_OFF_BUTTON: 'js-music-on-off',
    MUSIC_VOLUME_DECREASE_BUTTON: 'js-music-volume-decrease',
    MUSIC_VOLUME_INCREASE_BUTTON: 'js-music-volume-increase',
    SETTINGS_EXIT_BUTTON: 'js-settings-screen-exit-button',
    SETTINGS_SCREEN: 'js-settings-screen',
    SOUND_ON_OFF_BUTTON: 'js-sound-on-off',
    SOUND_VOLUME_DECREASE_BUTTON: 'js-sound-volume-decrease',
    SOUND_VOLUME_INCREASE_BUTTON: 'js-sound-volume-increase',
};

class Settings extends Common {
    constructor() {
        super(selectors.SETTINGS_SCREEN);
        this.bindToElements();
    }

    bindToElements() {
        const exitSettingsElement = this.bindToElement(selectors.SETTINGS_EXIT_BUTTON);
        const musicOnOffElement = this.bindToElement(selectors.MUSIC_ON_OFF_BUTTON);
        const musicVolumeUpElement = this.bindToElement(selectors.MUSIC_VOLUME_INCREASE_BUTTON);
        const musicVolumeDownElement = this.bindToElement(selectors.MUSIC_VOLUME_DECREASE_BUTTON);
        const soundOnOffElement = this.bindToElement(selectors.SOUND_ON_OFF_BUTTON);
        const soundVolumeUpElement = this.bindToElement(selectors.SOUND_VOLUME_INCREASE_BUTTON);
        const soundVolumeDownElement = this.bindToElement(selectors.SOUND_VOLUME_DECREASE_BUTTON);

        exitSettingsElement.addEventListener('click', () => this.changeVisibilityScreen(this.element, HIDDEN_SCREEN));
        musicOnOffElement.addEventListener('click', () => media.toggleMusicOnOff());
        musicVolumeUpElement.addEventListener('click', () => media.increaseMusicVolume());
        musicVolumeDownElement.addEventListener('click', () => media.decreaseMusicVolume());
        soundOnOffElement.addEventListener('click', () => media.toggleSoundOnOff());
        soundVolumeUpElement.addEventListener('click', () => media.increaseSoundVolume());
        soundVolumeDownElement.addEventListener('click', () => media.decreaseSoundVolume());
    }
}

export const settings = new Settings();
