# -*- coding: utf-8 -*-
{
    'name': 'Dash_owl',
    'version': '17.0.1.0',
    'description': """ Dash_owl Description """,
    'summary': """ Dash_owl Summary """,
    'author': '',
    'website': '',
    'category': '',
    'depends': ['base', 'web'],
    'data': [
        'views/greet_dashboard.xml'
        
    ],'assets': {
            'web.assets_backend': [
                'dash_owl/static/src/**/*'
            ],
        },
    'application': True,
    'installable': True,
    'auto_install': False,
    'license': 'LGPL-3',
}
