import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  private static validateCnpj(cnpj: string) {
    if (cnpj === '') return false;

    if (cnpj?.length !== 14) return false;

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj === '00000000000000' ||
      cnpj === '11111111111111' ||
      cnpj === '22222222222222' ||
      cnpj === '33333333333333' ||
      cnpj === '44444444444444' ||
      cnpj === '55555555555555' ||
      cnpj === '66666666666666' ||
      cnpj === '77777777777777' ||
      cnpj === '88888888888888' ||
      cnpj === '99999999999999'
    )
      return false;

    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += Number(numeros?.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += Number(numeros?.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) return false;

    return true;
  }

  static isValidCnpj(): ValidatorFn {
    return (fieldForm: AbstractControl): ValidationErrors | null => {
      const form = fieldForm.parent;

      const cnpj = form?.get('cnpj')?.value as string;

      if (!cnpj) return null;

      if (!this.validateCnpj(cnpj)) {
        return { invalidCnpj: true };
      } else {
        return null;
      }
    };
  }

  private static IsValidPhone(phone: string) {
    return (
      phone &&
      typeof phone === 'string' &&
      phone.replace(/\D/g, '').trim().length >= 10 &&
      phone.replace(/\D/g, '').trim().length <= 11
    );
  }

  static isValidPhone(): ValidatorFn {
    return (fieldForm: AbstractControl): ValidationErrors | null => {
      const form = fieldForm.parent;

      const phone = form?.get('phone')?.value as string;

      if (!phone) return null;

      if (!this.IsValidPhone(phone)) {
        return { invalidPhone: true };
      } else {
        return null;
      }
    };
  }
}
