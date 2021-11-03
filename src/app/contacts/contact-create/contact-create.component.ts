import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Contact } from "../contact.model";
import { ContactsService } from "../contacts.service";

@Component({
  selector: "app-contact-create",
  templateUrl: "./contact-create.component.html",
  styleUrls: ["./contact-create.component.css"],
})
export class ContactCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";

  private mode = "create";
  private contactId: string;
  isLoading = false;
  contact: Contact;

  constructor(
    public contactsService: ContactsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("contactId")) {
        this.mode = "edit";
        this.contactId = paramMap.get("contactId");
        this.isLoading = true;
        this.contactsService
          .getContact(this.contactId)
          .subscribe((contactData) => {
            this.isLoading = false;
            this.contact = {
              id: null,
              name: contactData.name,
              phone: contactData.phone,
              notes: "",
              secphone: "",
              email: "",
            };
          });
      } else {
        this.mode = "create";
        this.contactId = null;
      }
    });
  }

  onSaveContact(form: NgForm) {
    if (!form.invalid) {
      this.isLoading = true;
      if (this.mode === "create") {
        this.contactsService.addContact(form.value);
      } else {
        this.contactsService.updateContact(this.contactId, form.value);
      }
      form.resetForm();
    }
  }
}
