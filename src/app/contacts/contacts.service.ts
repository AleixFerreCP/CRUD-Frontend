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
    return this.http.get<{ _id: string; name: string; phone: string }>(
      "http://localhost:3000/contacts/" + id
    );
  }

  addContact(name: string, phone: string) {
    const contact: Contact = {
      id: null,
      name: name,
      phone: phone,
      notes: "",
      secphone: "",
      email: "",
    };

    this.http
      .post<{ message: string; contactId: string }>(
        "http://localhost:3000/contacts",
        contact
      )
      .subscribe((responseData) => {
        contact.id = responseData.contactId;
        this.contacts.push(contact);
        this.contactsUpdated.next([...this.contacts]);
        this.router.navigate(["/"]);
      });
  }

  updateContact(contactId: string, name: string, phone: string) {
    const contact: Contact = {
      id: null,
      name: name,
      phone: phone,
      notes: "",
      secphone: "",
      email: "",
    };
    this.http
      .put("http://localhost:3000/contacts/" + contactId, contact)
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
      .delete("http://localhost:3000/contacts/" + contactId)
      .subscribe(() => {
        const updatedContacts = this.contacts.filter(
          (contact) => contact.id !== contactId
        );
        this.contacts = updatedContacts;
        this.contactsUpdated.next([...this.contacts]);
      });
  }
}
