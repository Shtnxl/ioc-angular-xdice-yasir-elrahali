import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, catchError, map, of, switchMap, timer } from 'rxjs';

export function longitudMinima(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = String(control.value ?? '').trim();
    return valor.length > 0 && valor.length < min
      ? { longitudMinima: { requerida: min, actual: valor.length } }
      : null;
  };
}

export function terminoConResultados(
  comprobar: (texto: string) => Observable<boolean>
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const valor = String(control.value ?? '').trim();
    if (!valor) {
      return of(null);
    }
    return timer(400).pipe(
      switchMap(() => comprobar(valor)),
      map((hay) => (hay ? null : { sinResultados: true })),
      catchError(() => of(null))
    );
  };
}