# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Several small UI changes
- rename search ordering options
- change facet names
- change color of disables nodes in tree(s)
- add expand and close all buttons to tree(s)
- add logos to data repositories
- redirect users when switching trees while filters have been applied before
- enable facet count(s) in original keyword tree
- new organization schema replacing ckan default version to add custom fields
- replace breadcrumb on detail page with back to search results page if user originates from search results
- add checkbox to hide empty nodes from filter tree(s)

## [1.3.0] - 2023-03-29
- Add msl_download_link field to solr indexing
- Several UI changes

## [1.2.0] - 2023-03-08

- Update filtertree to reflect changes to geochem vocab
- Adjust typo when adding data repositories
- Fixed several typos
- Adjust citation information in recent additions sections
- Add new background images for index page and cycle backgrounds
- Update styling of about page
- Adjust sorting methods in search results overview
- Split keyword display into originally assigned keywords and detected vocab terms
- update filtertree with new sorted parts
- Add vocabulary section
- Change breadcrump for data publications
- Add search option for filters
- Relocate javascript files to webassets
- Change schema and views to work with empty description/notes field
- Add top level filtering and display document count
- Change schemas etc. to store and work with interpreted/original keywords
- Add tooltips to explain vocabularies and keyword detection

## [1.1.0] - 2022-11-11

- Add changelog in CHANGELOG.md
- Update schema to contain specific fields for identifiers instead of previously used identifier/identifiertype fields
- Add publication date field to schema
- Change templating to work with changes to schema
- Change schema, views and configs to implement four new vocabularies: geological age, geological setting, 
paleomagnetism and geochemistry
- Several changes to GUI

## [1.0.1] - 2022-05-24

- First release