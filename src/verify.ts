import express from 'express';
import fs from 'fs';
import HandleBars from 'handlebars';
import { dataSource } from './dbconfig';

export async function verifyId(req: express.Request, res: express.Response) {
  try {
    const cred = await dataSource
      .query(
            `SELECT * FROM cred WHERE id = $1 LIMIT 1`,
            [req.params.id]
        );

    if (!cred) {
      return res.sendFile("view/file_not_found.html");
    }
    /* Build the verification template file */
    let tmpl = fs.readFileSync("view/verify_template.html");
    let template = HandleBars.compile(tmpl.toString());

    const rendered = template({
	credential: cred,
	id: req.params.id,
	vc: cred.vc,
    });
      
    return res.send(rendered);
  } catch (error) {
    console.log('Error: ', error);
    return res.sendFile("view/server_error.html");
  }
}
