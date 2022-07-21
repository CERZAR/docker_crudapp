from django.template import loader
from django.http import HttpResponse
from django.conf import settings
from django.shortcuts import redirect


def index(request):
    if hasattr(settings, 'DEBUG_FRONTED') and settings.DEBUG_FRONTED:
        return redirect('http://localhost:1841/DopuskWork/')
    else:
        template = loader.get_template('dopuskwork.html')
        context = {
            'hostname': 'http://{}/'.format(request.get_host())
        }
        return HttpResponse(template.render(context, request))
