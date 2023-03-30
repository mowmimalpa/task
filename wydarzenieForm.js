import { LightningElement, track } from 'lwc';
import addEvent from '@salesforce/apex/EventController.addEvent';
import addParticipant from '@salesforce/apex/ParticipantController.addParticipant';

export default class WydarzenieForm extends LightningElement {
    @track eventName;
    @track eventDate;
    @track eventLocation;
    @track eventDescription;
    @track participantFirstName;
    @track participantLastName;
    @track participantBirthdate;
    @track participantEmail;
    @track error;
    @track login;
    @track password;

    handleInputChange(event) {
        const field = event.target.name;
        const value = event.target.value;
        this[field] = value;
    }

    addEvent() {
        const fields = {
            Name: this.eventName,
            Date__c: this.eventDate,
            Location__c: this.eventLocation,
            Description__c: this.eventDescription
        };
        addEvent({ fields })
            .then(() => {
                this.resetForm('event');
            })
            .catch(error => {
                this.error = error.body.message;
            });
    }

    addParticipant() {
        if (new Date(this.participantBirthdate) > new Date('2003-03-30')) {
            this.error = 'Uczestnik musi być pełnoletni';
            return;
        }
        const fields = {
            FirstName: this.participantFirstName,
            LastName: this.participantLastName,
            Birthdate__c: this.participantBirthdate,
            Email__c: this.participantEmail
        };
        addParticipant({ fields })
            .then(() => {
                this.resetForm('participant');
            })
            .catch(error => {
                this.error = error.body.message;
            });
    }

    handleInputChange(event) {
        const field = event.target.name;
        const value = event.target.value;
        this[field] = value;
    }

    handleLoginClick() {
    
        console.log('login', this.login);
        console.log('password', this.password);
    }
}

    resetForm(type)  
        this.eventName = '';
        this.eventDate = '';
        this.eventLocation = '';
        this.eventDescription = '';
        this.participantFirstName = '';
        this.participantLastName = '';
        this.participantBirthdate = '';
        this.participantEmail = '';
        this.error = null 
