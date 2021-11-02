import { Injectable } from "@angular/core";
import { Contact } from "./contact.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class ContactsService {
  private contacts: Contact[] = [];
  private contactsUpdated = new Subject<Contact[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getContacts() {
    this.http
      .get<{ message: string; contacts: any }>(
        "http://localhost:3000/api/contacts"
      )
      .pipe(
        map((contactData) => {
          return contactData.contacts.map((contact) => {
            return {
              title: contact.title,
              content: contact.content,
              id: contact._id,
            };
          });
        })
      )
      .subscribe((transformedContacts) => {
        this.contacts = transformedContacts;
        this.contactsUpdated.next([...this.contacts]);
      });
  }

  getContactUpdateListener() {
    return this.contactsUpdated.asObservable();
  }

  getContact(id: string) {
    return this.http.get<{ _id: string; title: string; content: string }>(
      "http://localhost:3000/api/contacts/" + id
    );
  }

  addContact(title: string, content: string) {
    const contact: Contact = {
      id: null,
      title: title,
      content: content,
    };

    this.http
      .post<{ message: string; contactId: string }>(
        "http://localhost:3000/api/contacts",
        contact
      )
      .subscribe((responseData) => {
        contact.id = responseData.contactId;
        this.contacts.push(contact);
        this.contactsUpdated.next([...this.contacts]);
        this.router.navigate(["/"]);
      });
  }

  updateContact(contactId: string, title: string, content: string) {
    const contact: Contact = {
      id: contactId,
      title: title,
      content: content,
    };
    this.http
      .put("http://localhost:3000/api/contacts/" + contactId, contact)
      .subscribe((response) => {
        const updatedContacts = [...this.contacts];
        const oldContactIndex = updatedContacts.findIndex(
          (p) => p.id === contact.id
        );
        updatedContacts[oldContactIndex] = contact;
        this.contacts = updatedContacts;
        this.contactsUpdated.next([...this.contacts]);
        this.router.navigate(["/"]);
      });
  }

  deleteContact(contactId: string) {
    this.http
      .delete("http://localhost:3000/api/contacts/" + contactId)
      .subscribe(() => {
        const updatedContacts = this.contacts.filter(
          (contact) => contact.id !== contactId
        );
        this.contacts = updatedContacts;
        this.contactsUpdated.next([...this.contacts]);
      });
  }
}
