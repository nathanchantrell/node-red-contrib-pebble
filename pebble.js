/**
 * Copyright 2015 Nathan Chantrell @nathanchantrell
 * http://nathan.chantrell.net
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
    "use strict";
    var Timeline = require('pebble-api').Timeline;
    var timeline = new Timeline();

    function PebbleNode(n) {
        RED.nodes.createNode(this,n);
        this.title = n.title;
        var credentials = this.credentials;
        if ((credentials) && (credentials.hasOwnProperty("pebbletoken"))) { this.pebbletoken = credentials.pebbletoken; }
        else { this.error("No Pebble User Token set"); }
        var node = this;
        this.on("input",function(msg) {
            var pinTitle = this.title||msg.payload||"Node-RED";
            if (node.pebbletoken) {
		var userToken = node.pebbletoken;

		if (msg.notify == true) {
        	        var pin = new Timeline.Pin({
			  id: Date.now().toString(),
	                  time: new Date(msg.time),
	                  duration: msg.duration,
			  createNotification: {
			    layout: ({
			     type: 'genericNotification',
			     tinyIcon: Timeline.Pin.Icon.NOTIFICATION_FLAG,
			     title: pinTitle,
			     body: msg.body
			    })
			  },
        	          layout: new Timeline.Pin.Layout({
	                    type: Timeline.Pin.LayoutType.GENERIC_PIN,
	                    tinyIcon: Timeline.Pin.Icon.NOTIFICATION_FLAG,
	                    title: pinTitle,
	                    body: msg.body
	                  })
	                });
		} else {
			var pin = new Timeline.Pin({
			  id: Date.now().toString(),
			  time: new Date(msg.time),
			  duration: msg.duration,
			  layout: new Timeline.Pin.Layout({
			    type: Timeline.Pin.LayoutType.GENERIC_PIN,
			    tinyIcon: Timeline.Pin.Icon.NOTIFICATION_FLAG,
			    title: pinTitle,
			    body: msg.body
			  })
			});
	}
		timeline.sendUserPin(userToken, pin, function (err) {
		  if (err) {
		    node.warn("Pebble Timeline error: " + err);
		  }
		});
            }
            else {
                node.warn("Pebble User Token credentials not set.");
            }
        });
    }

    RED.nodes.registerType("pebble",PebbleNode, {
        credentials: {
            pebbletoken: {type: "password"}
        }
    });
}
