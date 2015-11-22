node-red-contrib-pebble
=======================

A <a href="http://nodered.org">Node-RED</a> node to send pins and optional nofifitcations to the Timeline on a Pebble smartwatch.

Install
-------

Run the following command in the root directory of your Node-RED install

    npm install node-red-contrib-pebble


Usage
-----

Uses **msg.time** to set the time for the pin (required).

Optionally uses **msg.payload** to set the title, if not already set in the properties.

Optionally uses **msg.duration** to set the duration.

Optionally uses **msg.body** to set the body text of the pin

Optionally set **msg.notify** to true to get a notification when the pin is created

The Pebble User Token is stored in a separate credentials file.

You can use the <a href="http://apps.getpebble.com/en_US/application/5648acf2b2013fe638000097">Timeline Token</a> app to get a token.
