import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  const app = express();
  const port = process.env.PORT || 8082;
  
  app.use(bodyParser.json());
  
  app.get( "/filteredimage", async ( req: express.Request, res: express.Response ) => {
    const image_url: string = req.query.image_url;

    if (image_url === undefined || image_url.length === 0) {
      res.status(400).send("Invalid request.");
    } else {
      try {
        const imageLocalPath = await filterImageFromURL(image_url);
        res.status(200).sendFile(imageLocalPath);
        res.on("finish", () => {
        deleteLocalFiles([imageLocalPath]);
        });
      } catch (error) {
        console.error(error);
        res.status(500).send(error.toString());
      }
    }
  } );

  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();