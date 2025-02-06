import {Injectable} from "@angular/core";
import {LoginCredentials} from "../../model/login-credentials.model";
import {Observable, Observer} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  USERNAME_REF = 'USER';
  PASSWORD_REF = 'PASS';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Fetches the stored username and password, if they exist
   * @returns LoginCredentials, or null if they don't exist
   */
  getStoredCredentials(): LoginCredentials | null {
    const storedUsername: string | null = localStorage.getItem(this.USERNAME_REF);
    const storedPassword: string | null = localStorage.getItem(this.PASSWORD_REF);

    if (storedUsername !== null && storedPassword !== null) {
      return new LoginCredentials(storedUsername, storedPassword);
    } else {
      return null;
    }
  }

  /**
   * Stores the given username and password in localStorage
   * @param username
   * @param password
   */
  storeCredentials(username: string, password: string): void {
    localStorage.setItem(this.USERNAME_REF, username);
    localStorage.setItem(this.PASSWORD_REF, password);
  }

  clearStoredCredentials(): void {
    localStorage.removeItem(this.USERNAME_REF);
    localStorage.removeItem(this.PASSWORD_REF);
  }

  /**
   * Validates the login credentials by sending a health check request to the server
   * @param username
   * @param password
   * @returns
   */
  validateCredentials(username: string, password: string): Observable<LoginCredentials> {
    return new Observable<LoginCredentials>((observer: Observer<LoginCredentials>) => {
      this.httpClient.get(environment.url + "/health", {responseType: 'text'}).subscribe({
        next: (response: string) => {
          if (response === "UP") {
            observer.next(new LoginCredentials(username, password));
            observer.complete();
          } else {
            observer.error(new Error("Unable to connect to server"));
          }
        },
        error: (error: unknown) => {
          observer.error(error);
        }
      });
    });
  }


  /**
   * Fetches the stored login credentials and validates them with a health check
   * @returns LoginCredentials, or null if they don't exist
   */
  getAndValidateStoredCredentials(): Observable<LoginCredentials> {
    const storedUsername = localStorage.getItem(this.USERNAME_REF);
    const storedPassword = localStorage.getItem(this.PASSWORD_REF);

    if (storedUsername && storedPassword) {
      return this.validateCredentials(storedUsername, storedPassword);
    } else {
      return new Observable<LoginCredentials>((observer) => {
        observer.error(new Error("No login credentials found"));
      });
    }
  }

  /**
   * Validates login credentials with a health check and stores them in localStorage if successful
   * @param username
   * @param password
   * @returns
   */
  validateAndStoreCredentials(username: string, password: string): Observable<LoginCredentials> {
    this.storeCredentials(username, password);
    return new Observable<LoginCredentials>((observer) => {
      return this.validateCredentials(username, password).subscribe({
        next: (response: LoginCredentials) => {
          observer.next(response);
          observer.complete();
        },
        error: (error: unknown) => {
          this.clearStoredCredentials();
          observer.error(error);
        }
      })
    })
  }
}