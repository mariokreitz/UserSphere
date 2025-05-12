import {FormControl} from '@angular/forms';

export type RegisterForm = {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
};
