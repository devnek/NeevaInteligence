import os
import markdown
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.conf import settings
from django.http import Http404
from .forms import ContactForm

def get_reports_metadata():
    reports_dir = os.path.join(settings.BASE_DIR, 'reports')
    reports_list = []
    
    if not os.path.exists(reports_dir):
        return reports_list
        
    for filename in os.listdir(reports_dir):
        if filename.endswith('.md'):
            file_path = os.path.join(reports_dir, filename)
            slug = filename.replace('.md', '')
            with open(file_path, 'r', encoding='utf-8') as f:
                first_line = f.readline()
                title = first_line.replace('# ', '').strip() if first_line.startswith('# ') else slug.replace('_', ' ').title()
                
                # Get a small summary (first paragraph)
                summary = ""
                for line in f:
                    if line.strip() and not line.startswith('#'):
                        summary = line.strip()[:150] + "..."
                        break
                
                reports_list.append({
                    'title': title,
                    'slug': slug,
                    'summary': summary
                })
    return reports_list

def home(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Your inquiry has been submitted. Our analyst will contact you shortly.")
            return redirect('home')
    else:
        form = ContactForm()
    
    # Show only top 2 reports as featured on home page
    reports = get_reports_metadata()[:2]
    
    return render(request, 'core/index.html', {
        'form': form,
        'reports': reports
    })

def reports_list(request):
    reports = get_reports_metadata()
    return render(request, 'core/reports_list.html', {
        'reports': reports
    })

def report_detail(request, slug):
    reports_dir = os.path.join(settings.BASE_DIR, 'reports')
    file_path = os.path.join(reports_dir, f"{slug}.md")
    
    if not os.path.exists(file_path):
        raise Http404("Report not found")
        
    with open(file_path, 'r', encoding='utf-8') as f:
        raw_content = f.read()
        html_content = markdown.markdown(raw_content)
        
        # Extract title
        title = raw_content.split('\n')[0].replace('# ', '').strip() if raw_content.startswith('# ') else slug.replace('_', ' ').title()
        
    return render(request, 'core/report_detail.html', {
        'title': title,
        'content': html_content
    })

def leadership(request):
    return render(request, 'core/leadership.html')
