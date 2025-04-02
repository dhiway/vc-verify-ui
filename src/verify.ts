import express from 'express';
import fs from 'fs';
import HandleBars from 'handlebars';
import { dataSource } from './dbconfig';

HandleBars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

HandleBars.registerHelper('isObject', function(value) {
    return typeof value === 'object';
});

export async function verifyId(req: express.Request, res: express.Response) {
  try {
    const cred = await dataSource
      .query(
            `SELECT * FROM cred WHERE id = $1 LIMIT 1`,
            [req.params.id]
        );
    if (!cred) {
      return res.sendFile("view/file_not_found.html", {root: __dirname});
    }

    /* Build the verification template file */
    let tmpl = fs.readFileSync(`${__dirname}/view/verify_template.html`);
    let template = HandleBars.compile(tmpl.toString());

    const rendered = template({
	credential: cred,
	id: req.params.id,
	vc: cred?.vc,
	content: cred?.vc?.credentialSubject,
    });
      
    return res.send(rendered);
  } catch (error) {
    console.log('Error: ', error);
    return res.sendFile("view/server_error.html", {root: __dirname});
  }
}
