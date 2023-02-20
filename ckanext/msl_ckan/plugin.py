import os
import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit
import json
from flask import Blueprint, render_template


def get_filter_menu():
    f = open(os.path.join(os.path.dirname(__file__), 'public/tree.json'))
    data = json.load(f)

    return data

class MslCkanPlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)
    plugins.implements(plugins.IBlueprint)
    plugins.implements(plugins.ITemplateHelpers)

    # IConfigurer
    def update_config(self, config_):
        toolkit.add_template_directory(config_, 'templates')
        toolkit.add_public_directory(config_, 'public')
        toolkit.add_resource('fanstatic', 'msl_ckan')
        toolkit.add_resource('assets', 'msl_ckan')

    def get_helpers(self):
        return {'msl_ckan_get_filter_menu': get_filter_menu}

    def vocab_view(self):
        return render_template("vocabs.html")

    def get_blueprint(self):
        blueprint = Blueprint(self.name, self.__module__)
        blueprint.template_folder = 'templates'

        blueprint.add_url_rule('/vocabularies', 'vocabularies', self.vocab_view)

        return blueprint
