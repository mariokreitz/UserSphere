import { Injectable } from '@angular/core';

const THEME_KEY = 'theme';
type ThemeType = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    private currentTheme: ThemeType = 'light';

    constructor() {
        this.loadTheme();
    }

    setTheme(theme: ThemeType) {
        this.currentTheme = theme;
        document.documentElement.classList.toggle('theme-dark', theme === 'dark');
        document.documentElement.classList.toggle('theme-light', theme === 'light');
        localStorage.setItem(THEME_KEY, theme);
    }

    getTheme(): ThemeType {
        return this.currentTheme;
    }

    loadTheme() {
        const saved = localStorage.getItem(THEME_KEY) as ThemeType | null;
        this.setTheme(saved === 'dark' ? 'dark' : 'light');
    }
}
