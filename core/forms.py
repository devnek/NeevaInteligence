from django import forms
from .models import ContactMessage

class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']
        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'Full Name', 'class': 'form-input'}),
            'email': forms.EmailInput(attrs={'placeholder': 'Email Address', 'class': 'form-input'}),
            'subject': forms.TextInput(attrs={'placeholder': 'Subject', 'class': 'form-input'}),
            'message': forms.Textarea(attrs={'placeholder': 'Tell us about your research needs...', 'class': 'form-input', 'rows': 4}),
        }
