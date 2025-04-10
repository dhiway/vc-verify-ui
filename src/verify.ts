import express from 'express';
import fs from 'fs';
import HandleBars from 'handlebars';
import { dataSource } from './dbconfig';

HandleBars.registerHelper('json', function (context) {
  return JSON.stringify(context);
});

HandleBars.registerHelper('isObject', function (value) {
  return typeof value === 'object';
});

export async function verifyId(req: express.Request, res: express.Response) {
  const decodeUri = decodeURIComponent(req.params.id)
  try {
    const [cred] = await dataSource
      .query(
        `SELECT * FROM cred WHERE identifier = $1 LIMIT 1`,
        [decodeUri]
      );
    if (!cred) {
      return res.sendFile("view/file_not_found.html", { root: __dirname });
    }

    /* Build the verification template file */
    let tmpl = fs.readFileSync(`${__dirname}/view/verify_template.html`);
    let template = HandleBars.compile(tmpl.toString());
    const parseVC = JSON.parse(cred?.vc ?? "{}")
    const rendered = template({
      credential: cred,
      id: decodeUri,
      vc: parseVC,
      content: parseVC?.credentialSubject,
      metadata: parseVC.metadata
    });

    return res.send(rendered);
  } catch (error) {
    console.log('Error: ', error);
    return res.sendFile("view/server_error.html", { root: __dirname });
  }
}
