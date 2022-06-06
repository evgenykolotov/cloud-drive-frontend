import { HttpParams } from '@angular/common/http';

/**
 * @type {BuildHttpPArams} - Тип объекта для создания HttpParams
 */
type BuildHttpPArams = Record<string, string | number | boolean | undefined>;

/**
 * @class
 * @name HttpHelper
 * @classdesc Утилита для работы с составлением http запросов.
 */
export class HttpHelper {
  /**
   * Формализует путь для http запроса.
   * @public
   * @param {string[]} paths - Массив строк для формализации пути.
   * @returns {string} - Формализованный путь для запроса.
   */
  public static combineUrlFragments(...paths: string[]): string {
    const rawUrl = paths.join('/');
    const urlFragments = rawUrl.split('/').filter(fragment => Boolean(fragment));
    return `/${ urlFragments.join('/') }/`
  }

  /**
   * Собирает объект в HttpParams для запроса.
   * @public
   * @param {T} obj - Составной объект с параметрами для запроса. 
   * @returns {HttpParams} - Готовый объект с параметрами.
   */
  public static buildHttpParams<T extends BuildHttpPArams>(obj: T): HttpParams {
    const paramsResult = Object.keys(obj)
      .map<[string, string | number | boolean | undefined]>(key => ([key, obj[key]]))
      .filter(([_, value]) => value !== undefined)
      .reduce((accumulator, [key, value]) => ({ ...accumulator, [key]: value}), {});
    return new HttpParams({ fromObject: paramsResult });
  }
}
