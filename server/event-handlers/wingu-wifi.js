const { raw } = require("objection");
const fetch = require("node-fetch");
const UserModel = require("../models/user");

const { events } = require("../utils/storage-hooks-events");
const { SHooksEventEmitter } = require("../utils/event-emitter");
const { socketEventEmitter } = require("../utils/event-emitter");

function wifiUnlockRequest(authToken, signal) {
  let WIFI_UNLOCK_REQUEST_URL = process.env.WIFI_UNLOCK_REQUEST_URL;
  const WINGU_API_KEY = process.env.WINGU_API_KEY;

  if (WIFI_UNLOCK_REQUEST_URL === undefined || WINGU_API_KEY === undefined)  {
    throw new Error("WIFI_UNLOCK_REQUEST_URL or WINGU_API_KEY is not defined");
  }

  WIFI_UNLOCK_REQUEST_URL =  WIFI_UNLOCK_REQUEST_URL.replace(":token", authToken).replace(":apiKey",WINGU_API_KEY)

  return fetch(WIFI_UNLOCK_REQUEST_URL, {
      method: "POST",
      redirect: "follow",
      signal,
      headers: {
        "accept": "text/plain",
      }
    }
  ).then((response) => response.text());
}


module.exports = () => {
  /**
   * On chapter completed
   */
  SHooksEventEmitter.on(events.user.chapter.countOnInteractionComplete, async (payload) => {
      const userId = payload.creatorId;
      const user = await UserModel.query()
        .select()
        .where('id', userId)
        .whereNotNull(raw(`("metadata" ->> 'authorizationToken')`))
        .first();
      console.log("+++++++++++++", user);
      if (!user) {
        return;
      }

      // const controller = new AbortController();
      // const timeout = setTimeout(() => {
      //   controller.abort();
      // }, 150);

      let networkRetries = 3;

      (async () => {
        while(networkRetries > 0) {
          try {
            return await wifiUnlockRequest(user.metadata.winguToken)
          } catch (error) {
            networkRetries--;

            if (networkRetries === 0) { //TODO: Ask Dennis what invalid token returns
              throw error;
            }
          }
        }
      })()
        .then((address) => {
          console.log("WIFI UNLOCKED", address);
          // send address to the frontend for redirects
          socketEventEmitter.emit("redirect", {redirectUrl: address, userId: userId});
        })
        .catch ((error) => {
          console.log("WIFI UNLOCK ERROR", error);
        }).finally(() => {
          // clearTimeout(timeout);
          // TODO: delete winugu token from user
        });
  }
  );
};
