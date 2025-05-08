import { Component, effect, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-theme-switcher',
  imports: [MatIcon, MatButtonModule],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent {
  darkMode = signal(false);

  setDarkMode = effect(() => {
    document.documentElement.classList.toggle('dark', this.darkMode());
  });
}
