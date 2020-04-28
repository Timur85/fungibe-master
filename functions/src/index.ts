import {config, https} from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';

try {
  // Admin SDK can only be initialized once
  admin.initializeApp(config().firebase);
} catch (e) {
  console.log('Admin SDK can only be initialized once!', e.message);
}

const corsHandler = cors({origin: true});

export const createUser = https.onRequest((request, response) => {
  corsHandler(request, response, async () => {
    const body = request.body;
    if (!response || !body) {
      return response.send().status(400);
    }

    if (body.password !== body.repeatPassword) {
      return response.send().status(400);
    }
    try {
      const user = await admin.auth().createUser({
        email: body.email,
        password: body.password,
        displayName: body.fullName,
        disabled: false,
      });

      const newUser = {
        id: user.uid,
        fullName: user.displayName,
        email: user.email,
        role: 'USER'
      };

      await admin.firestore().collection('users').doc(user.uid).set(newUser);

      return response.send(newUser).status(201);
    } catch (e) {
      return response.send(e.message).status(409);
    }
  });
});
