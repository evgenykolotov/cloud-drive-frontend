import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthUserRequest, RegistrationUserRequest } from '../types/api-request.types';
import { AuthUserResponse } from '../types/api-response.types';
import { HttpHelper } from '../utils/http-helper';

/**
 * @class
 * @name ApplicationService
 * @classdesc Сервис для обращений к API авторизации.
 */
@Injectable()
export class ApplicationService {
  private static readonly AUHTORIZATION_API_PATH = HttpHelper.combineUrlFragments(environment.apiPath, 'auth');
  private static readonly LOGIN_USER_API_PATH = HttpHelper.combineUrlFragments(ApplicationService.AUHTORIZATION_API_PATH, 'login');
  private static readonly REGISTRATION_USER_API_PATH = HttpHelper.combineUrlFragments(ApplicationService.AUHTORIZATION_API_PATH, 'registration');
  private static readonly LOGOUT_USER_API_PATH = HttpHelper.combineUrlFragments(ApplicationService.AUHTORIZATION_API_PATH, 'logout');
  private static readonly REFRESH_TOKENS_API_PATH = HttpHelper.combineUrlFragments(ApplicationService.AUHTORIZATION_API_PATH, 'refresh');

  /**
   * @constructor
   * @param {HttpClient} httpClient - Сервис для реализации запросов к API
   */
  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  /**
   * Запрос на авторизацию пользователя в приложении.
   * @public
   * @param {AuthUserRequest} payload - Данные для авторизации.
   * @returns {AuthUserResponse}
   */
  public loginUser(payload: AuthUserRequest): Observable<AuthUserResponse> {
    return this.httpClient.post<AuthUserResponse>(ApplicationService.LOGIN_USER_API_PATH, payload);
  }

  /**
   * Запрос на вторизацию пользователя в приложении.
   * @public
   * @param {RegistrationUserRequest} payload - Данные для авторизации. 
   * @returns {AuthUserResponse}
   */
  public registrationUser(payload: RegistrationUserRequest): Observable<AuthUserResponse> {
    return this.httpClient.post<AuthUserResponse>(ApplicationService.REGISTRATION_USER_API_PATH, payload);
  }

  /**
   * Запрос на сброс сессии пользователя в приложении.
   * @public
   */
  public logoutUser(): Observable<void> {
    return this.httpClient.get<void>(ApplicationService.LOGOUT_USER_API_PATH);
  }

  /**
   * Запрос на обновление токенов авторизации в приложении.
   * @public
   */
  public refreshTokens(): Observable<AuthUserResponse> {
    return this.httpClient.get<AuthUserResponse>(ApplicationService.REFRESH_TOKENS_API_PATH);
  }
}
