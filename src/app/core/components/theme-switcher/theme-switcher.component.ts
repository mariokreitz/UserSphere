import { Component, effect, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LocalStorageService } from '../../services/localStorage.service';

@Component({
  selector: 'app-theme-switcher',
  imports: [MatIcon, MatButtonModule],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent {
  private localStorageService = inject(LocalStorageService);

  public darkMode = signal<boolean>(
    this.localStorageService.get('darkMode') === 'true'
  );

  public setDarkMode = effect(() => {
    const isDark = this.darkMode();

    this.localStorageService.set('darkMode', isDark.toString());

    document.documentElement.classList.toggle('dark', isDark);
  });
}
