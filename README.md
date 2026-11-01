# Framefind local prototype

A browser-only prototype for adding an event photo set and finding likely matching photos from a guest's face photo or camera capture.

## Run locally

Requires Node.js 20+ and an internet connection for the pinned face-matching library and model files.

```sh
node server.mjs
```

Open http://127.0.0.1:4173. Camera access is limited to localhost/HTTPS by browsers.

## Privacy and scope

- Photo files and face descriptors are held only in page memory; they are not sent to the local server or persisted after the tab closes.
- Face processing runs in the browser. The JavaScript library and model weights are loaded from jsDelivr; user photos are not sent to that CDN.
- This is not a multi-user service. An organizer's uploaded photos are not visible to guests on other devices. Shared storage, access controls, consent/retention policy, and deployment are required for that.
- Face matching can be inaccurate; results are possible matches, not identity verification.

Run the matching helper tests with `node --test tests/matching.test.mjs`.
