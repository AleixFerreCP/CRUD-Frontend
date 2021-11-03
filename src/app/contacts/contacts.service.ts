import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Contact } from "./contact.model";

@Injectable({ providedIn: "root" })
export class ContactsService {
  private contacts: Contact[] = [];
  private contactsUpdated = new Subject<Contact[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getContacts() {
    this.http
      .get<Contact[]>("http://localhost:3000/contacts")
      .subscribe((contacts) => {
        this.contacts = contacts;
        this.contactsUpdated.next([...this.contacts]);
      });
  }

  getContactUpdateListener() {
    return this.contactsUpdated.asObservable();
  }

  getContact(id: string) {
    return this.http.get<Contact>(`http://localhost:3000/contacts/${id}`);
  }

  addContact(contact: Contact) {
    this.http
      .post<{ id: string }>("http://localhost:3000/contacts", contact)
      .subscribe((responseData) => {
        contact.id = responseData.id;
        this.contacts.push(contact);
        this.contactsUpdated.next([...this.contacts]);
        this.router.navigate(["/"]);
      });
  }

  updateContact(id: string, contact: Contact) {
    this.http
      .put(`http://localhost:3000/contacts/${id}`, contact)
      .subscribe(() => {
        const updatedContacts = [...this.contacts];
        const oldContactIndex = updatedContacts.findIndex((p) => p.id === id);
        updatedContacts[oldContactIndex] = contact;
        this.contacts = updatedContacts;
        this.contactsUpdated.next([...this.contacts]);
        this.router.navigate(["/"]);
      });
  }

  deleteContact(contactId: string) {
    this.http
      .delete(`http://localhost:3000/contacts/${contactId}`)
      .subscribe(() => {
        const updatedContacts = this.contacts.filter(
          (contact) => contact.id !== contactId
        );
        this.contacts = updatedContacts;
        this.contactsUpdated.next([...this.contacts]);
      });
  }
}
