import {Injectable} from "@angular/core";
import {MessageService} from "primeng/api";
import {NotificationLevel} from "../../enum/notification-level.enum";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private messageService: MessageService) {
  }

  notify(level: NotificationLevel, title: string, message: string, duration = 3000): void {
    this.messageService.add({severity: level, summary: title, detail: message, life: duration});
  }

  notifySticky(level: NotificationLevel, title: string, message: string): void {
    this.messageService.add({severity: level, summary: title, detail: message, sticky: true});
  }

  clear(): void {
    this.messageService.clear();
  }
}