# discuss-the-web

A sample application to illustrate how to use
[Docuss](https://github.com/sylque/docuss) in a web app.

The application allows to register website urls and discuss them.

**This project is not active anymore.** Fixes are provided to existing users, but I stopped working on new features. You might want to check  [DiscPage](https://github.com/sylque/discpage), which is somehow a simplified version of Docuss.

## See it live

The application is hosted [here](http://www.docuss.org/docuss/d_home).

## Technical overview

The app uses the following tools:

- Meteor
- React + React Router
- Material-UI
- [dcs-client](https://github.com/sylque/dcs-client)
- [dcs-simple-route-matcher](https://github.com/sylque/dcs-simple-route-matcher)
- [dcs-react-router-sync](https://github.com/sylque/dcs-react-router-sync)

You can see the "naked" app [here](http://dtw.docuss.org/), without the
discussion feature.

The discussion feature is added using
[Docuss](https://github.com/sylque/docuss), based on
[this json file](https://github.com/sylque/discuss-the-web/blob/master/public/dcs-website.json).

## License

See [here](https://github.com/sylque/docuss#license).
